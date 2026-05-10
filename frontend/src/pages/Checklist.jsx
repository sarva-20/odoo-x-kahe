import React from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

import DoodleBackground from '../components/DoodleBackground';

const Checklist = () => {
    return (
        <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            <main className="max-w-[800px] mx-auto px-4 py-8 flex-grow w-full">
                <h1 className="text-4xl font-black mb-8">Packing Checklist</h1>
                <div className="bg-white border-2 border-black rounded-md neo-shadow p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">description</span> Documents</h2>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-4 p-2">
                            <input type="checkbox" defaultChecked className="w-6 h-6 border-2 border-black rounded text-primary focus:ring-primary cursor-pointer" />
                            <span className="font-bold line-through opacity-70">Passport</span>
                        </li>
                        <li className="flex items-center gap-4 p-2 bg-surface border-2 border-black rounded-md neo-shadow-sm">
                            <input type="checkbox" className="w-6 h-6 border-2 border-black rounded text-primary focus:ring-primary cursor-pointer" />
                            <span className="font-bold">Travel Insurance</span>
                        </li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Checklist;
