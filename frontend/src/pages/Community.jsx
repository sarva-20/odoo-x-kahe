import React from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

import DoodleBackground from '../components/DoodleBackground';

const Community = () => {
    return (
        <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar activeTab="community" />
            <main className="max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h1 className="text-4xl font-black">Community Feed</h1>
                    <div className="bg-white border-2 border-black rounded-md neo-shadow p-4">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-secondary rounded-full border-2 border-black"></div>
                            <div className="font-bold">SarahTravels</div>
                        </div>
                        <p className="mb-4">Just finished my 3-day itinerary in Kyoto! Highly recommend renting a bike.</p>
                        <button className="bg-primary text-white px-4 py-2 font-bold rounded-md border-2 border-black neo-shadow-sm neo-btn">Copy Trip</button>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white border-2 border-black rounded-md neo-shadow p-4 sticky top-24">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">trending_up</span> Trending</h2>
                        <ul className="space-y-4 font-bold">
                            <li className="flex justify-between items-center"><span>1. Bali, Indonesia</span><span className="material-symbols-outlined">arrow_forward</span></li>
                            <li className="flex justify-between items-center"><span>2. Tokyo, Japan</span><span className="material-symbols-outlined">arrow_forward</span></li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Community;
