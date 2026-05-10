import React from 'react';
import TopNavBar from '../components/TopNavBar';
import DoodleBackground from '../components/DoodleBackground';

const SearchResults = () => {
    return (
         <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar activeTab="home" />
            <main className="flex-1 flex flex-col md:flex-row h-[calc(100vh-80px)]">
                <section className="w-full md:w-1/2 bg-white border-r-2 border-black flex flex-col z-10 p-6 overflow-y-auto">
                    <h1 className="text-3xl font-black mb-4">Search Results</h1>
                    <input className="neo-input w-full p-3 border-2 border-black rounded-md font-bold mb-6" defaultValue="Paragliding in Bali" />
                    <div className="space-y-4">
                        <div className="bg-white border-2 border-black rounded-md neo-shadow p-4 border-l-8 border-l-primary">
                            <h3 className="text-xl font-bold">Uluwatu Cliff Paragliding</h3>
                            <p className="font-bold text-on-surface-variant mb-4">$85 USD • 2 Hours</p>
                            <button className="w-full bg-surface-variant border-2 border-black font-bold py-2 rounded-md hover:bg-primary hover:text-white transition-colors">Add to Trip</button>
                        </div>
                    </div>
                </section>
                <section className="hidden md:flex w-1/2 bg-surface-variant items-center justify-center p-8">
                     <div className="text-2xl font-black opacity-50">Map View Placeholder</div>
                </section>
            </main>
        </div>
    );
};

export default SearchResults;
