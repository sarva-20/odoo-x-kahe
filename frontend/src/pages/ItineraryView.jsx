import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';
import { getItinerary } from '../services/itinerary';
import { getTripBudget, getTripRecommendations } from '../services/utility';

const ItineraryView = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('tripId');

    const [trip, setTrip] = useState(null);
    const [budget, setBudget] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const formatDate = (value) => {
        if (!value) return 'TBD';
        return new Date(value).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    useEffect(() => {
        const loadTrip = async () => {
            if (!tripId) {
                setError('No trip selected.');
                setIsLoading(false);
                return;
            }

            try {
                const [itineraryResponse, budgetResponse, recommendationsResponse] = await Promise.all([
                    getItinerary(tripId),
                    getTripBudget(tripId),
                    getTripRecommendations(tripId),
                ]);

                if (!itineraryResponse?.success) throw new Error(itineraryResponse?.message || 'Unable to load itinerary');
                if (!budgetResponse?.success) throw new Error(budgetResponse?.message || 'Unable to load budget');
                if (!recommendationsResponse?.success) throw new Error(recommendationsResponse?.message || 'Unable to load recommendations');

                setTrip(itineraryResponse.data);
                setBudget(budgetResponse.data);
                setRecommendations(recommendationsResponse.data?.recommendations || []);
            } catch (loadError) {
                setError(loadError.message || 'Unable to load itinerary');
            } finally {
                setIsLoading(false);
            }
        };

        setIsLoading(true);
        setError('');
        loadTrip();
    }, [tripId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center doodle-bg">
                <DoodleBackground />
                <div className="relative z-10 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="min-h-screen flex flex-col doodle-bg">
                <DoodleBackground />
                <TopNavBar activeTab="trips" />
                <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full text-center">
                    <h2 className="text-3xl font-black mb-4">{error || 'Trip Not Found'}</h2>
                    <button
                        onClick={() => navigate('/my-trips')}
                        className="bg-primary text-white py-2 px-6 rounded-none font-bold neo-shadow neo-btn border-2 border-black"
                    >
                        Back to My Trips
                    </button>
                </main>
                <Footer />
            </div>
        );
    }

    const {
        target_budget = 0,
        estimated_total = 0,
        stay_total = 0,
        transport_total = 0,
        activities_total = 0,
        food_total = 0,
        remaining_budget = 0,
    } = budget || {};

    const percentSpent = target_budget > 0 ? Math.min(100, (estimated_total / target_budget) * 100) : 0;

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <div className="mb-8 bg-white p-6 border-2 border-black neo-shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full -z-10 opacity-50" />

                        <h1 className="text-5xl font-headline font-black mb-2">{trip.name}</h1>
                        <p className="text-gray-500 font-bold mb-6 text-lg">
                            {formatDate(trip.startDate)} to {formatDate(trip.endDate)}
                        </p>

                        <div className="mb-6 max-w-2xl">
                            <div className="flex justify-between text-sm font-bold mb-2">
                                <span>Spent: ${estimated_total.toFixed(2)}</span>
                                <span>Budget: ${target_budget.toFixed(2)}</span>
                            </div>
                            <div className="w-full h-4 bg-gray-200 border-2 border-black rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-1000"
                                    style={{ width: `${percentSpent}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to={`/checklist?tripId=${tripId}`}
                                className="px-6 py-2 bg-secondary text-white font-bold border-2 border-black neo-shadow-sm transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">inventory</span> Packing List
                            </Link>
                            <Link
                                to="/notes"
                                className="px-6 py-2 bg-surface text-primary font-bold border-2 border-black neo-shadow-sm transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">edit_note</span> Trip Notes
                            </Link>
                            <Link
                                to="/invoice"
                                className="px-6 py-2 bg-white text-black font-bold border-2 border-black neo-shadow-sm transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">receipt_long</span> Invoice
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-[65%] flex flex-col gap-8">
                            {trip.stops?.map((stop, index) => (
                                <div key={stop.id} className="relative">
                                    <h3 className="text-2xl font-black text-primary mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined">location_on</span>
                                        {stop.cityName}
                                    </h3>

                                    <div className="space-y-6 relative pl-6">
                                        <div className="absolute left-[11px] top-4 bottom-4 w-0 border-l-4 border-dotted border-secondary z-0" />

                                        {stop.activities?.map((activity) => (
                                            <div
                                                key={activity.id}
                                                className="bg-white p-5 border-2 border-black border-l-8 border-l-primary neo-shadow rounded-none relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                                            >
                                                <div>
                                                    <h4 className="font-headline font-black text-xl mb-1">{activity.name}</h4>
                                                    <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
                                                        <span className="flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-sm">schedule</span>
                                                            {activity.time || 'Flexible'}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-sm">category</span>
                                                            {activity.category || 'Activity'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <span className="text-xl font-black text-primary">${Number(activity.cost || 0).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}

                                        {(!stop.activities || stop.activities.length === 0) && (
                                            <div className="bg-white p-4 border-2 border-dashed border-gray-300 relative z-10 text-center font-bold text-gray-400">
                                                No activities planned for this stop yet.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {(!trip.stops || trip.stops.length === 0) && (
                                <div className="bg-white p-4 border-2 border-dashed border-gray-300 text-center font-bold text-gray-400">
                                    No stops planned yet.
                                </div>
                            )}
                        </div>

                        <div className="lg:w-[35%] relative">
                            <div className="sticky top-8 bg-white border-2 border-black neo-shadow-lg p-6">
                                <h3 className="text-2xl font-headline font-black mb-6">Budget Breakdown</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between items-center font-bold text-sm">
                                        <span>Transport</span>
                                        <span>${Number(transport_total).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center font-bold text-sm">
                                        <span>Hotel</span>
                                        <span>${Number(stay_total).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center font-bold text-sm">
                                        <span>Activities</span>
                                        <span>${Number(activities_total).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center font-bold text-sm">
                                        <span>Meals</span>
                                        <span>${Number(food_total).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t-2 border-black pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-lg">Total Spent</span>
                                        <span className="font-black text-2xl text-primary">${estimated_total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-500">Remaining</span>
                                        <span className={`font-black text-lg ${remaining_budget < 0 ? 'text-error' : 'text-green-600'}`}>
                                            ${remaining_budget.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-headline font-black mt-8 mb-4">Recommendations</h3>
                                <div className="space-y-3">
                                    {recommendations.length ? recommendations.map((item) => (
                                        <div key={`${item.activity_name}-${item.city_name}`} className="border-2 border-dashed border-black rounded-md p-3">
                                            <p className="font-bold">{item.activity_name}</p>
                                            <p className="text-sm text-on-surface-variant">
                                                {item.city_name} • ${Number(item.estimated_cost).toFixed(2)}
                                            </p>
                                        </div>
                                    )) : <p className="text-sm text-on-surface-variant font-semibold">No recommendations yet.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ItineraryView;
