import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';
import { addActivity, addStop, getItinerary } from '../services/itinerary';

const ItineraryBuilder = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('tripId');
    const [trip, setTrip] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [stopForm, setStopForm] = useState({
        cityName: '',
        hotelCostPerDay: '',
        transportCost: '',
        arrivalDate: '',
        departureDate: '',
    });
    const [activityForms, setActivityForms] = useState({});

    const loadItinerary = async () => {
        if (!tripId) {
            setError('No trip selected. Create a trip first.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await getItinerary(tripId);

            if (!response?.success) {
                throw new Error(response?.message || 'Unable to load itinerary');
            }

            setTrip(response.data);
        } catch (loadError) {
            setError(loadError.message || 'Unable to load itinerary');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setError('');
        loadItinerary();
    }, [tripId]);

    const handleStopSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await addStop(tripId, stopForm);

            if (!response?.success) {
                throw new Error(response?.message || 'Unable to add stop');
            }

            setStopForm({
                cityName: '',
                hotelCostPerDay: '',
                transportCost: '',
                arrivalDate: '',
                departureDate: '',
            });
            await loadItinerary();
        } catch (saveError) {
            setError(saveError.message || 'Unable to add stop');
        }
    };

    const handleActivitySubmit = async (stopId, event) => {
        event.preventDefault();
        setError('');
        const form = activityForms[stopId] || {};

        try {
            const response = await addActivity(stopId, form);

            if (!response?.success) {
                throw new Error(response?.message || 'Unable to add activity');
            }

            setActivityForms((current) => ({
                ...current,
                [stopId]: {
                    name: '',
                    category: '',
                    cost: '',
                    time: '',
                    estimatedPopularity: '',
                    isFree: false,
                },
            }));
            await loadItinerary();
        } catch (saveError) {
            setError(saveError.message || 'Unable to add activity');
        }
    };

    const formatDate = (dateValue) => {
        if (!dateValue) return 'TBD';
        return new Date(dateValue).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            <main className="max-w-[1000px] mx-auto px-4 py-8 flex-grow w-full">
                <div className="mb-8">
                    <h1 className="text-4xl font-black mb-2 flex items-center gap-2">
                        Build Your Itinerary <span className="material-symbols-outlined text-primary">flight</span>
                    </h1>
                    <span className="bg-secondary text-white px-4 py-1 rounded-full font-bold border-2 border-black neo-shadow">
                        {trip?.name || 'Trip Builder'}
                    </span>
                </div>

                {isLoading && (
                    <div className="bg-white border-2 border-black rounded-md neo-shadow p-6 mb-8 font-bold">
                        Loading itinerary...
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border-2 border-error rounded-md neo-shadow p-6 mb-8 font-bold text-error">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="bg-white border-2 border-black border-l-8 border-l-primary p-6 neo-shadow-lg rounded-md relative z-10">
                        <h2 className="text-2xl font-black mb-4">Add a Stop</h2>
                        <form className="space-y-4" onSubmit={handleStopSubmit}>
                            <input
                                className="w-full border-2 border-primary rounded-md p-3 font-bold text-lg"
                                placeholder="City name"
                                value={stopForm.cityName}
                                onChange={(event) => setStopForm((current) => ({ ...current, cityName: event.target.value }))}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    className="w-full border-2 border-primary rounded-md p-3"
                                    type="number"
                                    placeholder="Hotel cost/day"
                                    value={stopForm.hotelCostPerDay}
                                    onChange={(event) => setStopForm((current) => ({ ...current, hotelCostPerDay: event.target.value }))}
                                />
                                <input
                                    className="w-full border-2 border-primary rounded-md p-3"
                                    type="number"
                                    placeholder="Transport cost"
                                    value={stopForm.transportCost}
                                    onChange={(event) => setStopForm((current) => ({ ...current, transportCost: event.target.value }))}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    className="w-full border-2 border-primary rounded-md p-3"
                                    type="date"
                                    value={stopForm.arrivalDate}
                                    onChange={(event) => setStopForm((current) => ({ ...current, arrivalDate: event.target.value }))}
                                />
                                <input
                                    className="w-full border-2 border-primary rounded-md p-3"
                                    type="date"
                                    value={stopForm.departureDate}
                                    onChange={(event) => setStopForm((current) => ({ ...current, departureDate: event.target.value }))}
                                />
                            </div>
                            <button className="bg-surface-variant border-2 border-black px-4 py-2 font-bold rounded-md neo-shadow-sm neo-btn" type="submit">
                                Add Stop
                            </button>
                        </form>
                    </section>

                    <section className="space-y-4">
                        <div className="bg-white border-2 border-black rounded-md neo-shadow p-6">
                            <h2 className="text-2xl font-black mb-4">Current Stops</h2>
                            {trip?.stops?.length ? trip.stops.map((stop) => (
                                <div key={stop.id} className="border-2 border-primary rounded-md p-4 mb-4 last:mb-0">
                                    <div className="flex justify-between gap-4 mb-3">
                                        <div>
                                            <h3 className="font-bold text-xl">{stop.cityName}</h3>
                                            <p className="text-sm font-semibold text-on-surface-variant">
                                                {formatDate(stop.arrivalDate)} - {formatDate(stop.departureDate)}
                                            </p>
                                        </div>
                                        <div className="text-right text-sm font-bold">
                                            <div>Hotel/day: {stop.hotelCostPerDay ?? 0}</div>
                                            <div>Transport: {stop.transportCost ?? 0}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        {stop.activities?.map((activity) => (
                                            <div key={activity.id} className="border border-dashed border-black rounded-md p-2 flex justify-between gap-3 text-sm">
                                                <span>{activity.name}</span>
                                                <span>{activity.cost}</span>
                                            </div>
                                        ))}
                                        {!stop.activities?.length && <div className="text-sm font-semibold text-on-surface-variant">No activities yet.</div>}
                                    </div>

                                    <form className="grid grid-cols-2 gap-3" onSubmit={(event) => handleActivitySubmit(stop.id, event)}>
                                        <input
                                            className="w-full border-2 border-primary rounded-md p-2"
                                            placeholder="Activity name"
                                            value={activityForms[stop.id]?.name || ''}
                                            onChange={(event) => setActivityForms((current) => ({ ...current, [stop.id]: { ...(current[stop.id] || {}), name: event.target.value } }))}
                                        />
                                        <input
                                            className="w-full border-2 border-primary rounded-md p-2"
                                            placeholder="Category"
                                            value={activityForms[stop.id]?.category || ''}
                                            onChange={(event) => setActivityForms((current) => ({ ...current, [stop.id]: { ...(current[stop.id] || {}), category: event.target.value } }))}
                                        />
                                        <input
                                            className="w-full border-2 border-primary rounded-md p-2"
                                            type="number"
                                            placeholder="Cost"
                                            value={activityForms[stop.id]?.cost || ''}
                                            onChange={(event) => setActivityForms((current) => ({ ...current, [stop.id]: { ...(current[stop.id] || {}), cost: event.target.value } }))}
                                        />
                                        <input
                                            className="w-full border-2 border-primary rounded-md p-2"
                                            placeholder="Time"
                                            value={activityForms[stop.id]?.time || ''}
                                            onChange={(event) => setActivityForms((current) => ({ ...current, [stop.id]: { ...(current[stop.id] || {}), time: event.target.value } }))}
                                        />
                                        <input
                                            className="w-full border-2 border-primary rounded-md p-2"
                                            type="number"
                                            placeholder="Popularity"
                                            value={activityForms[stop.id]?.estimatedPopularity || ''}
                                            onChange={(event) => setActivityForms((current) => ({ ...current, [stop.id]: { ...(current[stop.id] || {}), estimatedPopularity: event.target.value } }))}
                                        />
                                        <label className="flex items-center gap-2 text-sm font-bold">
                                            <input
                                                type="checkbox"
                                                checked={Boolean(activityForms[stop.id]?.isFree)}
                                                onChange={(event) => setActivityForms((current) => ({ ...current, [stop.id]: { ...(current[stop.id] || {}), isFree: event.target.checked } }))}
                                            />
                                            Free activity
                                        </label>
                                        <button className="col-span-2 bg-primary text-white border-2 border-black px-4 py-2 font-bold rounded-md neo-shadow neo-btn" type="submit">
                                            Add Activity
                                        </button>
                                    </form>
                                </div>
                            )) : <div className="text-sm font-bold text-on-surface-variant">No stops yet. Add one to begin.</div>}
                        </div>

                        <div className="flex gap-4 mt-4">
                            <button className="flex-1 py-4 border-2 border-dashed border-primary text-primary font-bold rounded-md hover:bg-surface transition-colors" type="button" onClick={() => navigate('/my-trips')}>
                                Back to Trips
                            </button>
                            <button className="flex-1 py-4 bg-primary text-white border-2 border-black font-bold rounded-md neo-shadow neo-btn" type="button" onClick={() => navigate(`/itinerary-view?tripId=${tripId}`)}>
                                View Itinerary
                            </button>
                        </div>
                    </section>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default ItineraryBuilder;
