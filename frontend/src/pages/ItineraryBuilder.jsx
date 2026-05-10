import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';

const ItineraryBuilder = () => {
    const navigate = useNavigate();
    return (
        <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            <main className="max-w-[800px] mx-auto px-4 py-8 flex-grow w-full">
                <div className="mb-8">
                    <h1 className="text-4xl font-black mb-2 flex items-center gap-2">Build Your Itinerary <span className="material-symbols-outlined text-primary">flight</span></h1>
                    <span className="bg-secondary text-white px-4 py-1 rounded-full font-bold border-2 border-black neo-shadow">Euro Summer Backpacking</span>
                </div>

                <div className="flex flex-col gap-0">
                    <div className="bg-white border-2 border-black border-l-8 border-l-primary p-6 neo-shadow-lg rounded-md relative z-10 mb-8">
                        <input className="w-full border-2 border-primary rounded-md p-3 font-bold text-xl mb-4" placeholder="Section Title (e.g. Flight to Paris)" type="text" />
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input className="w-full border-2 border-primary rounded-md p-3" type="datetime-local" />
                            <input className="w-full border-2 border-primary rounded-md p-3" type="datetime-local" />
                        </div>
                        <button className="bg-surface-variant border-2 border-black px-4 py-2 font-bold rounded-md neo-shadow-sm neo-btn">Add Details</button>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button className="flex-1 py-4 border-2 border-dashed border-primary text-primary font-bold rounded-md hover:bg-surface transition-colors">+ Add Section</button>
                    <button className="flex-1 py-4 bg-primary text-white border-2 border-black font-bold rounded-md neo-shadow neo-btn" onClick={() => navigate('/itinerary-view')}>Save Itinerary</button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ItineraryBuilder;
