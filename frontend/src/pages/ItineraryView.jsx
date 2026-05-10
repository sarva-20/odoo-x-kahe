import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';

const ItineraryView = () => {
    const navigate = useNavigate();
    return (
        <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            <main className="max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <h1 className="text-4xl font-black mb-4">European Backpacking</h1>
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">Day 1: Arrival</h2>
                        <div className="bg-white border-2 border-black rounded-md neo-shadow p-4 mb-4 border-l-8 border-l-primary">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-xl">Flight to Paris (CDG)</h3>
                                    <p className="text-on-surface-variant">08:30 AM • AirFrance AF1234</p>
                                </div>
                                <div className="bg-primary-container text-on-primary px-3 py-1 font-bold rounded-md border-2 border-black">$450</div>
                            </div>
                        </div>
                    </section>
                    <div className="flex gap-4 mt-4">
                        <Link to="/checklist" className="bg-surface border-2 border-black px-4 py-2 font-bold rounded-md neo-shadow-sm neo-btn">Packing List</Link>
                        <Link to="/notes" className="bg-surface border-2 border-black px-4 py-2 font-bold rounded-md neo-shadow-sm neo-btn">Trip Notes</Link>
                        <Link to="/invoice" className="bg-surface border-2 border-black px-4 py-2 font-bold rounded-md neo-shadow-sm neo-btn">Invoice</Link>
                    </div>
                </div>
                <div className="md:col-span-1">
                    <div className="bg-white border-2 border-black rounded-md neo-shadow p-6 sticky top-24">
                        <h3 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">Budget Breakdown</h3>
                        <div className="text-4xl font-black text-primary mb-4">$1,850 <span className="text-lg text-on-surface-variant font-normal">Spent</span></div>
                        <div className="space-y-2 font-bold">
                            <div className="flex justify-between"><span>Transport</span><span>$850</span></div>
                            <div className="flex justify-between"><span>Accommodation</span><span>$600</span></div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ItineraryView;
