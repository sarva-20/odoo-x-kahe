import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';
import API_BASE_URL from '../config/api.js';

const ItineraryView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Attempt to get tripId from location state, or fallback
    const tripId = location.state?.tripId || location.pathname.split('/').pop() || 1; 

    const [trip, setTrip] = useState(null);
    const [budgetData, setBudgetData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTripData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };

                // Fetch Itinerary Full
                const tripRes = await fetch(`${API_BASE_URL}/api/trips/${tripId}/full`, { headers });
                const tripJson = await tripRes.json();
                
                // Fetch Budget
                const budgetRes = await fetch(`${API_BASE_URL}/api/trips/${tripId}/budget`, { headers });
                const budgetJson = await budgetRes.json();

                if (tripJson.success) setTrip(tripJson.data);
                if (budgetJson.success) setBudgetData(budgetJson.data);
            } catch (err) {
                console.error("Error fetching itinerary data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTripData();
    }, [tripId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center doodle-bg">
                <DoodleBackground />
                <div className="relative z-10 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!trip || !budgetData) {
        return (
            <div className="min-h-screen flex flex-col doodle-bg">
                <DoodleBackground />
                <TopNavBar activeTab="trips" />
                <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full text-center">
                    <h2 className="text-3xl font-black mb-4">Trip Not Found</h2>
                    <button onClick={() => navigate('/my-trips')} className="bg-primary text-white py-2 px-6 rounded-none font-bold neo-shadow neo-btn border-2 border-black">Back to My Trips</button>
                </main>
                <Footer />
            </div>
        );
    }

    const { target_budget, estimated_total, stay_total, transport_total, activities_total, food_total, remaining_budget } = budgetData;
    
    // Chart data
    const pieData = [
        { name: 'Transport', value: transport_total, color: '#FF4500' }, // Coral
        { name: 'Hotel', value: stay_total, color: '#004B57' },     // Teal
        { name: 'Activities', value: activities_total, color: '#FFB347' }, // Amber
        { name: 'Meals', value: food_total, color: '#808080' },     // Grey
    ].filter(item => item.value > 0);

    const percentSpent = target_budget > 0 ? Math.min(100, (estimated_total / target_budget) * 100) : 0;

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full">
                
                {/* Top Section */}
                <div className="mb-8 bg-white p-6 border-2 border-black neo-shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full -z-10 opacity-50"></div>
                    
                    <h1 className="text-5xl font-headline font-black mb-2">{trip.name}</h1>
                    <p className="text-gray-500 font-bold mb-6 text-lg">
                        {new Date(trip.startDate).toLocaleDateString()} to {new Date(trip.endDate).toLocaleDateString()}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-6 max-w-2xl">
                        <div className="flex justify-between text-sm font-bold mb-2">
                            <span>Spent: ${estimated_total.toFixed(2)}</span>
                            <span>Budget: ${target_budget.toFixed(2)}</span>
                        </div>
                        <div className="w-full h-4 bg-gray-200 border-2 border-black rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-primary transition-all duration-1000" 
                                style={{ width: `${percentSpent}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap gap-4">
                        <Link to="/checklist" className="px-6 py-2 bg-secondary text-white font-bold border-2 border-black neo-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">inventory</span> Packing List
                        </Link>
                        <Link to="/notes" className="px-6 py-2 bg-surface text-primary font-bold border-2 border-black neo-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">edit_note</span> Trip Notes
                        </Link>
                        <Link to="/invoice" className="px-6 py-2 bg-white text-black font-bold border-2 border-black neo-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">receipt_long</span> Invoice
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT COLUMN: Itinerary Timeline */}
                    <div className="lg:w-[65%] flex flex-col gap-8">
                        {trip.stops.map((stop, index) => (
                            <div key={stop.id} className="relative">
                                {/* Day Label / Stop Label */}
                                <h3 className="text-2xl font-black text-primary mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined">location_on</span>
                                    {stop.cityName}
                                </h3>

                                <div className="space-y-6 relative pl-6">
                                    {/* Vertical Dotted Line */}
                                    <div className="absolute left-[11px] top-4 bottom-4 w-0 border-l-4 border-dotted border-secondary z-0"></div>

                                    {stop.activities && stop.activities.map((activity, actIndex) => (
                                        <div key={activity.id} className="bg-white p-5 border-2 border-black border-l-8 border-l-primary neo-shadow rounded-none relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:-translate-y-1 transition-transform">
                                            <div>
                                                <h4 className="font-headline font-black text-xl mb-1">{activity.name}</h4>
                                                <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {activity.time || "Flexible"}</span>
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">category</span> {activity.category || "Activity"}</span>
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <span className="text-xl font-black text-primary">${activity.cost.toFixed(2)}</span>
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
                    </div>

                    {/* RIGHT COLUMN: Budget Breakdown (Sticky) */}
                    <div className="lg:w-[35%] relative">
                        <div className="sticky top-8 bg-white border-2 border-black neo-shadow-lg p-6">
                            <h3 className="text-2xl font-headline font-black mb-6">Budget Breakdown</h3>
                            
                            <div className="h-64 w-full mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip formatter={(value) => `$${value.toFixed(2)}`} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center font-bold text-sm">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-[#FF4500] border border-black"></div> Transport</span>
                                    <span>${transport_total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center font-bold text-sm">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-[#004B57] border border-black"></div> Hotel</span>
                                    <span>${stay_total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center font-bold text-sm">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-[#FFB347] border border-black"></div> Activities</span>
                                    <span>${activities_total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center font-bold text-sm">
                                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-[#808080] border border-black"></div> Meals</span>
                                    <span>${food_total.toFixed(2)}</span>
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
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default ItineraryView;
