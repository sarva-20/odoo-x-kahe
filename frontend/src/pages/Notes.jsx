import React from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

import DoodleBackground from '../components/DoodleBackground';

const Notes = () => {
    return (
        <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            <main className="max-w-[800px] mx-auto px-4 py-8 flex-grow w-full">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-black">Trip Notes</h1>
                    <button className="bg-primary text-white font-bold px-4 py-2 rounded-md border-2 border-black neo-shadow neo-btn flex items-center gap-1"><span className="material-symbols-outlined">add</span> Add Note</button>
                </div>
                <div className="bg-white border-2 border-black rounded-md neo-shadow p-6 mb-6 border-l-8 border-l-secondary">
                    <h2 className="text-2xl font-bold mb-2">Hotel Check-in Details</h2>
                    <p className="text-lg">Booking reference: XYZ123. Ensure early check-in requested due to the red-eye flight.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Notes;
