import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/api.js';

const Invoice = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    
    // Attempt to get tripId from location state, or fallback
    const tripId = location.state?.tripId || location.pathname.split('/').pop() || 1; 

    const [budgetData, setBudgetData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_BASE_URL}/api/trips/${tripId}/budget`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await res.json();
                if (json.success) setBudgetData(json.data);
            } catch (err) {
                console.error("Failed to fetch budget", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBudget();
    }, [tripId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center doodle-bg">
                <DoodleBackground />
                <div className="relative z-10 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!budgetData) {
        return (
            <div className="min-h-screen flex flex-col doodle-bg">
                <DoodleBackground />
                <TopNavBar activeTab="trips" />
                <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full text-center">
                    <h2 className="text-3xl font-black mb-4">Invoice Not Found</h2>
                    <Link to="/my-trips" className="bg-primary text-white py-2 px-6 rounded-none font-bold neo-shadow neo-btn border-2 border-black">Back to My Trips</Link>
                </main>
                <Footer />
            </div>
        );
    }

    const { tripName, target_budget, estimated_total, remaining_budget } = budgetData;

    const pieData = [
        { name: 'Spent', value: estimated_total, color: '#FF4500' }, // Coral
        { name: 'Remaining', value: Math.max(0, target_budget - estimated_total), color: '#004B57' }, // Teal
    ];

    // Mock Line Items
    const lineItems = [
        { id: 1, category: 'Flight', desc: 'Roundtrip NYC to Paris', qty: 1, unit: 850.00, amount: 850.00 },
        { id: 2, category: 'Hotel', desc: 'Le Meurice - 4 nights', qty: 4, unit: 250.00, amount: 1000.00 }
    ];

    const subtotal = lineItems.reduce((acc, curr) => acc + curr.amount, 0);
    const tax = subtotal * 0.05;
    const discount = 0;
    const grandTotal = subtotal + tax - discount;

    const invoiceId = `INV-${new Date().getFullYear()}-${tripId.toString().padStart(4, '0')}`;

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            
            <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full">
                
                <div className="mb-6">
                    <Link to="/my-trips" className="font-bold text-gray-600 hover:text-primary flex items-center gap-1 w-fit">
                        <span className="material-symbols-outlined text-sm">arrow_back</span> Back to My Trips
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    {/* Top Info Card */}
                    <div className="lg:w-2/3 bg-white border-2 border-black neo-shadow-lg p-6 lg:p-10 flex flex-col md:flex-row justify-between gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full -z-10 opacity-50"></div>
                        
                        <div className="flex gap-6">
                            <div className="w-40 h-40 bg-gray-200 border-2 border-black neo-shadow-sm flex-shrink-0 flex items-center justify-center relative overflow-hidden group">
                                <span className="material-symbols-outlined text-6xl text-gray-400">landscape</span>
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1 className="text-3xl font-headline font-black mb-2">{tripName}</h1>
                                <p className="text-sm font-bold text-gray-500 mb-4">Aug 14 - Aug 21, {new Date().getFullYear()}</p>
                                <p className="text-sm font-bold bg-gray-100 px-3 py-1 border-2 border-black inline-block w-fit">Created by: {user?.name || 'Traveler'}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end justify-center space-y-3 border-t-2 md:border-t-0 md:border-l-2 border-dashed border-gray-300 pt-4 md:pt-0 md:pl-8">
                            <div className="text-sm font-bold text-gray-500 uppercase">Invoice ID</div>
                            <div className="text-xl font-black">{invoiceId}</div>
                            <div className="text-sm font-bold text-gray-500 uppercase mt-2">Status</div>
                            <div className={`px-4 py-1 border-2 border-black font-black text-sm uppercase
                                ${status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                                {status}
                            </div>
                        </div>
                    </div>

                    {/* Budget Insights */}
                    <div className="lg:w-1/3 bg-white border-2 border-black neo-shadow-lg p-6 relative">
                        <h3 className="text-xl font-headline font-black mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">pie_chart</span> Budget Insights</h3>
                        <div className="h-40 w-full mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
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
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between font-bold"><span>Total Budget</span><span>${target_budget.toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold"><span>Total Spent</span><span className="text-primary">${estimated_total.toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold border-t-2 border-gray-200 pt-2">
                                <span>Remaining</span>
                                <span className={remaining_budget < 0 ? 'text-error font-black' : 'text-green-600 font-black'}>${remaining_budget.toFixed(2)}</span>
                            </div>
                        </div>
                        <button 
                            className="w-full mt-4 py-2 border-2 border-primary text-primary font-bold neo-shadow-sm neo-btn bg-white hover:bg-surface"
                            onClick={() => navigate('/itinerary-view', { state: { tripId } })}
                        >
                            View Full Budget
                        </button>
                    </div>
                </div>

                {/* Line Items Table */}
                <div className="bg-white border-2 border-black neo-shadow-lg overflow-x-auto mb-8">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-surface border-b-2 border-black">
                                <th className="p-4 font-black uppercase text-sm">#</th>
                                <th className="p-4 font-black uppercase text-sm">Category</th>
                                <th className="p-4 font-black uppercase text-sm">Description</th>
                                <th className="p-4 font-black uppercase text-sm text-right">Qty</th>
                                <th className="p-4 font-black uppercase text-sm text-right">Unit Cost</th>
                                <th className="p-4 font-black uppercase text-sm text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map((item, i) => (
                                <tr key={item.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-gray-500">{i + 1}</td>
                                    <td className="p-4 font-bold"><span className="bg-gray-100 border-2 border-black px-2 py-1 text-xs">{item.category}</span></td>
                                    <td className="p-4 font-bold">{item.desc}</td>
                                    <td className="p-4 font-bold text-right">{item.qty}</td>
                                    <td className="p-4 font-bold text-right">${item.unit.toFixed(2)}</td>
                                    <td className="p-4 font-black text-right">${item.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-amber-50">
                            <tr>
                                <td colSpan="4" className="border-t-2 border-black"></td>
                                <td className="p-4 font-bold text-right border-t-2 border-black">Subtotal</td>
                                <td className="p-4 font-black text-right border-t-2 border-black">${subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="4"></td>
                                <td className="p-4 font-bold text-right border-b-2 border-gray-300">Tax (5%)</td>
                                <td className="p-4 font-black text-right border-b-2 border-gray-300">${tax.toFixed(2)}</td>
                            </tr>
                            <tr className="bg-surface">
                                <td colSpan="4" className="border-t-2 border-black"></td>
                                <td className="p-4 font-black text-right text-lg border-t-2 border-black">Grand Total</td>
                                <td className="p-4 font-black text-right text-2xl text-primary border-t-2 border-black">${grandTotal.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                    <button className="px-8 py-4 bg-white border-2 border-black font-bold text-lg neo-shadow-sm neo-btn hover:bg-gray-50 flex justify-center items-center gap-2">
                        <span className="material-symbols-outlined">download</span> Download PDF
                    </button>
                    <button className="px-8 py-4 bg-white border-2 border-black font-bold text-lg neo-shadow-sm neo-btn hover:bg-gray-50 flex justify-center items-center gap-2">
                        <span className="material-symbols-outlined">print</span> Print
                    </button>
                    {status === 'Pending' ? (
                        <button 
                            className="px-8 py-4 bg-primary text-white border-2 border-black font-bold text-lg neo-shadow neo-btn flex justify-center items-center gap-2"
                            onClick={() => setStatus('Paid')}
                        >
                            <span className="material-symbols-outlined">check_circle</span> Mark as Paid
                        </button>
                    ) : (
                        <button className="px-8 py-4 bg-green-500 text-white border-2 border-black font-bold text-lg neo-shadow opacity-50 cursor-not-allowed flex justify-center items-center gap-2">
                            <span className="material-symbols-outlined">check_circle</span> Paid
                        </button>
                    )}
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default Invoice;
