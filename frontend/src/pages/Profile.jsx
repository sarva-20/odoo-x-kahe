import React from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

import DoodleBackground from '../components/DoodleBackground';

const Profile = () => {
    return (
        <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar activeTab="profile" />
            <main className="max-w-[1000px] mx-auto px-4 py-8 flex-grow w-full space-y-8">
                <section className="bg-white border-2 border-black rounded-md neo-shadow p-8 flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-32 h-32 bg-secondary rounded-full border-4 border-black shrink-0"></div>
                    <div>
                        <h1 className="text-4xl font-black">Alex Wanderlust</h1>
                        <p className="text-xl font-bold text-on-surface-variant mb-4">@alex_explores</p>
                        <button className="bg-primary text-white font-bold px-4 py-2 rounded-md border-2 border-black neo-shadow-sm neo-btn flex items-center gap-2"><span className="material-symbols-outlined">edit</span> Edit Profile</button>
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-4">Preplanned Trips</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white border-2 border-black rounded-md neo-shadow p-4 flex justify-between items-center">
                            <span className="font-bold text-lg">Parisian Cafe Crawl</span>
                            <button className="bg-secondary text-white font-bold px-4 py-1 rounded-md border-2 border-black neo-shadow-sm">View</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
