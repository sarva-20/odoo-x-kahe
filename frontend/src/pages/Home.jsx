import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';

const Home = () => {
    return (
        <div className="doodle-bg min-h-screen flex flex-col relative pb-16">
            <DoodleBackground />
            <TopNavBar activeTab="home" />
            
            <main className="w-full max-w-[1200px] mx-auto px-6 py-8 flex-grow relative z-10 space-y-16">
                
                {/* SECTION 1 - HERO */}
                <section className="flex flex-col md:flex-row items-center w-full gap-8">
                    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                        <h1 className="font-headline font-black text-6xl md:text-[72px] leading-[1.1] uppercase">
                            <div className="text-on-surface">Plan.</div>
                            <div className="text-primary">Dream.</div>
                            <div className="text-secondary">Explore.</div>
                        </h1>
                        <p className="text-on-surface-variant text-lg font-medium max-w-md">
                            Your adventure hub. Stop dreaming and start packing. Let's build your next unforgettable journey.
                        </p>
                        <Link to="/plan-trip" className="w-fit bg-primary text-white px-8 py-4 font-bold text-xl rounded-md neo-shadow neo-btn flex items-center gap-2">
                            <span className="material-symbols-outlined">add</span>
                            Plan a Trip
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                        <svg className="w-full h-auto max-w-[500px]" viewBox="0 0 500 400" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            {/* Clouds */}
                            <path d="M 100 150 Q 120 120 150 130 Q 180 110 210 130 Q 230 160 200 180 L 100 180 Z" className="stroke-secondary" fill="rgba(0,75,87,0.05)" />
                            <path d="M 350 100 Q 370 70 400 80 Q 430 60 460 80 Q 480 110 450 130 L 350 130 Z" className="stroke-secondary" fill="rgba(0,75,87,0.05)" />
                            {/* Sun/Moon */}
                            <circle cx="80" cy="80" r="30" className="stroke-primary" fill="rgba(255,69,0,0.05)" />
                            {/* Stars */}
                            <path d="M 250 50 L 255 65 L 270 70 L 255 75 L 250 90 L 245 75 L 230 70 L 245 65 Z" className="stroke-primary" fill="var(--color-primary)" />
                            <path d="M 400 200 L 403 208 L 411 211 L 403 214 L 400 222 L 397 214 L 389 211 L 397 208 Z" className="stroke-primary" fill="var(--color-primary)" />
                            {/* Mountains */}
                            <path d="M 50 350 L 150 200 L 250 350" className="stroke-secondary" fill="rgba(0,75,87,0.1)" />
                            <path d="M 180 350 L 300 150 L 450 350" className="stroke-secondary" fill="rgba(0,75,87,0.15)" />
                            <path d="M 300 150 L 350 200" className="stroke-secondary" />
                            <path d="M 150 200 L 190 240" className="stroke-secondary" />
                            {/* Hot Air Balloon */}
                            <g className="animate-[stamp-pulse_4s_ease-in-out_infinite] origin-center" style={{ transformOrigin: '350px 250px' }}>
                                <path d="M 310 250 C 310 200 390 200 390 250 C 390 280 370 310 350 320 C 330 310 310 280 310 250 Z" className="stroke-primary" fill="rgba(255,69,0,0.1)" />
                                <path d="M 330 250 C 330 220 370 220 370 250 C 370 270 350 290 350 300 C 350 290 330 270 330 250 Z" className="stroke-primary" />
                                <rect x="340" y="325" width="20" height="15" rx="2" className="stroke-secondary" />
                                <line x1="335" y1="315" x2="340" y2="325" className="stroke-secondary" />
                                <line x1="365" y1="315" x2="360" y2="325" className="stroke-secondary" />
                            </g>
                        </svg>
                    </div>
                </section>

                {/* SECTION 2 - SEARCH BAR */}
                <section className="bg-white border-2 border-primary rounded-xl neo-shadow-lg p-4 flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-grow flex items-center gap-3 bg-surface rounded-md px-4 py-3 w-full border-2 border-transparent focus-within:border-primary transition-colors">
                        <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                        <input type="text" placeholder="Where to next?" className="bg-transparent border-none outline-none w-full font-bold text-lg text-on-surface placeholder:text-on-surface-variant" />
                    </div>
                    <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                        <button className="flex-shrink-0 px-4 py-3 bg-white border-2 border-primary text-primary font-bold rounded-full flex items-center gap-2 hover:bg-surface transition-colors neo-shadow-sm">
                            <span className="material-symbols-outlined text-sm">dashboard</span> Group by
                        </button>
                        <button className="flex-shrink-0 px-4 py-3 bg-white border-2 border-primary text-primary font-bold rounded-full flex items-center gap-2 hover:bg-surface transition-colors neo-shadow-sm">
                            <span className="material-symbols-outlined text-sm">filter_list</span> Filter
                        </button>
                        <button className="flex-shrink-0 px-4 py-3 bg-white border-2 border-primary text-primary font-bold rounded-full flex items-center gap-2 hover:bg-surface transition-colors neo-shadow-sm">
                            <span className="material-symbols-outlined text-sm">sort</span> Sort by
                        </button>
                    </div>
                </section>

                {/* SECTION 3 - TOP DESTINATIONS */}
                <section>
                    <h2 className="text-3xl font-headline font-bold mb-6 flex items-center gap-2 text-on-surface">Top Destinations <span className="text-primary">✈</span></h2>
                    <div className="flex overflow-x-auto gap-6 pb-6 pt-2 px-2 -mx-2 hide-scrollbar snap-x">
                        {/* Custom Destination Cards */}
                        {[
                            { name: 'Tokyo', color: '#FF4500', svg: <path d="M 50 150 L 50 20 L 70 20 L 70 150 M 30 150 L 90 150 M 40 100 L 80 100 M 45 60 L 75 60" fill="none" strokeWidth="6" strokeLinecap="round" /> },
                            { name: 'Paris', color: '#004B57', svg: <path d="M 60 20 L 30 150 L 90 150 Z M 45 100 L 75 100 M 50 60 L 70 60 M 60 150 L 60 120" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /> },
                            { name: 'New York', color: '#FFB300', svg: <path d="M 60 20 L 60 150 M 50 30 L 50 50 M 70 30 L 70 50 M 40 150 L 80 150 M 55 20 L 65 20 M 60 20 L 60 10 M 55 10 L 65 10" fill="none" strokeWidth="6" strokeLinecap="round" /> },
                            { name: 'Rome', color: '#FF4500', svg: <path d="M 20 80 C 20 30 100 30 100 80 L 100 150 L 20 150 Z M 20 80 L 100 80 M 20 115 L 100 115 M 40 80 L 40 150 M 60 80 L 60 150 M 80 80 L 80 150" fill="none" strokeWidth="5" strokeLinecap="round" /> },
                            { name: 'Bali', color: '#004B57', svg: <path d="M 60 20 L 40 50 L 80 50 Z M 60 50 L 30 90 L 90 90 Z M 60 90 L 20 140 L 100 140 Z M 50 140 L 50 150 M 70 140 L 70 150" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /> }
                        ].map((dest, i) => (
                            <div key={i} className="flex-shrink-0 w-48 bg-white border-2 border-dashed border-black rounded-xl p-4 neo-shadow hover:-translate-y-2 transition-transform cursor-pointer snap-start flex flex-col items-center group">
                                <div className="w-full h-32 bg-surface rounded-lg mb-4 flex justify-center items-center overflow-hidden relative group-hover:bg-[#fff0e5] transition-colors">
                                    <svg viewBox="0 0 120 170" className="w-full h-full p-4" stroke={dest.color}>
                                        {dest.svg}
                                    </svg>
                                </div>
                                <h3 className="font-bold text-xl uppercase tracking-wider">{dest.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 4 - PREVIOUS TRIPS */}
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-3xl font-headline font-bold text-on-surface">Previous Trips</h2>
                        <button className="font-bold text-primary hover:underline flex items-center gap-1">See All <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Summer in Kyoto", date: "Jun 12 - Jun 20, 2025", dests: 3, color: "bg-primary" },
                            { name: "Alpine Escape", date: "Jan 05 - Jan 15, 2025", dests: 2, color: "bg-secondary" },
                            { name: "Coastal Drive", date: "Sep 22 - Oct 01, 2024", dests: 5, color: "bg-amber-400" }
                        ].map((trip, i) => (
                            <div key={i} className="bg-white border-2 border-black rounded-xl neo-shadow overflow-hidden flex flex-col">
                                <div className={`h-24 w-full ${trip.color}`}></div>
                                <div className="p-6 flex flex-col flex-grow relative">
                                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-white border-2 border-black px-3 py-1 rounded-full font-bold text-xs neo-shadow-sm flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                                        {trip.dests} Dests
                                    </div>
                                    <h3 className="font-black text-2xl mb-2">{trip.name}</h3>
                                    <p className="text-on-surface-variant font-medium flex items-center gap-2 mb-6">
                                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                                        {trip.date}
                                    </p>
                                    <button className="mt-auto w-full py-3 bg-white text-primary border-2 border-primary font-bold rounded-md hover:bg-primary hover:text-white transition-colors neo-shadow-sm">
                                        View Trip
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 5 - BUDGET HIGHLIGHTS */}
                <section>
                    <div className="bg-white border-2 border-black border-l-8 border-l-secondary rounded-xl neo-shadow p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col md:flex-row gap-8 items-center w-full md:w-auto">
                            <h2 className="text-2xl font-headline font-bold text-on-surface mr-4">Budget Overview</h2>
                            
                            <div className="flex gap-8 w-full justify-between md:justify-start md:w-auto">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border-2 border-primary text-primary">
                                        <span className="material-symbols-outlined">flight_takeoff</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-on-surface-variant uppercase">Total Trips</p>
                                        <p className="font-black text-xl">4</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border-2 border-primary text-primary">
                                        <span className="material-symbols-outlined">account_balance_wallet</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-on-surface-variant uppercase">Total Spent</p>
                                        <p className="font-black text-xl">$3,200</p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-3">
                                    <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border-2 border-primary text-primary">
                                        <span className="material-symbols-outlined">analytics</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-on-surface-variant uppercase">Avg per Trip</p>
                                        <p className="font-black text-xl">$800</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full md:w-auto py-3 px-6 bg-primary text-white font-bold rounded-md neo-shadow neo-btn shrink-0">
                            View Full Budget
                        </button>
                    </div>
                </section>

            </main>
            
            <Footer />

            {/* FLOATING ACTION BUTTON */}
            <Link to="/plan-trip" className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center border-2 border-black neo-shadow-lg neo-btn z-50 hover:scale-105 transition-transform group">
                <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-300">add</span>
            </Link>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Home;
