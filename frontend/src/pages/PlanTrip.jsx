import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

import DoodleBackground from '../components/DoodleBackground';

const PlanTrip = () => {
    const navigate = useNavigate();
    return (
        <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar hideNav={true} />
            <main className="max-w-[800px] mx-auto px-4 py-8 flex-grow w-full">
                <div className="bg-white border-2 border-primary rounded-lg neo-shadow-lg overflow-hidden">
                    <div className="bg-primary p-6 text-white">
                        <h1 className="text-3xl font-black">Plan a New Trip</h1>
                    </div>
                    <form className="p-6 flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); navigate('/builder'); }}>
                        <div>
                            <label className="font-bold block mb-2">Trip Name</label>
                            <input className="neo-input w-full p-3 border-2 border-primary rounded-md" placeholder="e.g. Summer in Tokyo" type="text" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="font-bold block mb-2">Start Date</label>
                                <input className="neo-input w-full p-3 border-2 border-primary rounded-md" type="date" />
                            </div>
                            <div>
                                <label className="font-bold block mb-2">End Date</label>
                                <input className="neo-input w-full p-3 border-2 border-primary rounded-md" type="date" />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white py-4 font-bold rounded-md neo-shadow neo-btn text-xl mt-4 border-2 border-black">Create Trip</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PlanTrip;
