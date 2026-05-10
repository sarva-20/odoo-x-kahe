import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

import DoodleBackground from '../components/DoodleBackground';

const MyTrips = () => {
    return (
        <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            <main className="max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full">
                <h1 className="text-5xl font-black uppercase mb-8">My Trips</h1>
                
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><div className="w-4 h-4 bg-primary border-2 border-black rounded-full"></div> Ongoing</h2>
                    <div className="bg-white border-2 border-black border-l-8 border-l-primary neo-shadow-lg p-6 flex flex-col md:flex-row gap-6 rounded-md">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">European Summer Backpacking</h3>
                            <p className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary">location_on</span> Paris, Rome, Barcelona</p>
                            <p className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary">calendar_month</span> Jul 15 - Aug 30, 2024</p>
                        </div>
                        <div className="flex items-end">
                            <Link to="/itinerary-view" className="bg-primary text-white border-2 border-black px-6 py-2 font-bold rounded-md neo-shadow neo-btn">View Trip</Link>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><div className="w-4 h-4 bg-outline border-2 border-black rounded-full"></div> Completed</h2>
                    <div className="bg-white border-2 border-black border-l-8 border-l-outline neo-shadow-lg p-6 flex flex-col md:flex-row gap-6 rounded-md opacity-80">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2 text-on-surface-variant">Tokyo Drift</h3>
                            <p className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined">location_on</span> Tokyo, Kyoto</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default MyTrips;
