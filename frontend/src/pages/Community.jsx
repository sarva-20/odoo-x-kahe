import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';

const Community = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    
    const categories = ['All', 'Beach', 'Mountains', 'City Breaks', 'Adventure', 'Food & Culture'];

    const mockFeed = [
        {
            id: 1,
            user: { name: 'Sarah Jenkins', avatar: 'SJ', location: 'London, UK' },
            time: '2 hours ago',
            photo: 'bg-teal-200',
            text: 'Just finished an incredible 10-day itinerary through the Swiss Alps. Highly recommend the scenic train routes!',
            hashtags: ['#switzerland', '#alps', '#trainjourney'],
            likes: 124,
            comments: 18,
        },
        {
            id: 2,
            user: { name: 'David Chen', avatar: 'DC', location: 'Toronto, CA' },
            time: '5 hours ago',
            photo: 'bg-amber-200',
            text: 'My ultimate street food guide to Osaka! Included all the best takoyaki spots and local markets. 🐙🍜',
            hashtags: ['#osaka', '#japan', '#foodie'],
            likes: 89,
            comments: 5,
        },
        {
            id: 3,
            user: { name: 'Elena Rodriguez', avatar: 'ER', location: 'Madrid, ES' },
            time: '1 day ago',
            photo: 'bg-coral-200',
            text: 'Backpacking through Southeast Asia? Use my 3-week budget template covering Vietnam, Cambodia, and Thailand.',
            hashtags: ['#backpacking', '#budget', '#asia'],
            likes: 342,
            comments: 56,
        }
    ];

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="community" />
            
            <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full">
                
                {/* Search & Filters */}
                <div className="mb-8 space-y-4">
                    <h1 className="text-4xl font-headline font-black flex items-center gap-2">
                        <span className="material-symbols-outlined text-4xl text-primary">public</span> 
                        Traveler Community
                    </h1>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow relative">
                            <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">search</span>
                            <input 
                                className="neo-input w-full p-3 pl-10 border-2 border-black font-bold focus:border-primary bg-white neo-shadow-sm"
                                placeholder="Search itineraries, users, or tags..."
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-3 bg-white border-2 border-black font-bold neo-shadow-sm neo-btn flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">filter_list</span> Filter
                            </button>
                            <button className="px-4 py-3 bg-white border-2 border-black font-bold neo-shadow-sm neo-btn flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">sort</span> Sort
                            </button>
                        </div>
                    </div>

                    <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`whitespace-nowrap px-4 py-2 font-bold border-2 border-black rounded-full transition-all ${activeCategory === cat ? 'bg-primary text-white neo-shadow-sm' : 'bg-white text-black hover:bg-surface'}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Main Feed */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        {mockFeed.map(post => (
                            <div key={post.id} className="bg-white border-2 border-black neo-shadow-lg p-6 flex flex-col relative overflow-hidden group">
                                
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-surface border-2 border-black flex items-center justify-center font-black text-lg">
                                            {post.user.avatar}
                                        </div>
                                        <div>
                                            <h3 className="font-headline font-black text-lg leading-tight">{post.user.name}</h3>
                                            <p className="text-xs font-bold text-gray-500">{post.user.location}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">{post.time}</span>
                                </div>

                                {/* Content */}
                                <p className="font-bold mb-4">{post.text}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.hashtags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-teal-50 text-secondary border border-secondary font-bold text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Photo */}
                                <div className={`w-full h-64 border-2 border-black mb-4 relative flex items-center justify-center overflow-hidden ${post.photo}`}>
                                    <span className="material-symbols-outlined text-black/20 text-6xl">landscape</span>
                                </div>

                                {/* Footer & Actions */}
                                <div className="flex justify-between items-center mt-2 pt-4 border-t-2 border-dashed border-gray-200">
                                    <div className="flex gap-4">
                                        <button className="flex items-center gap-1 font-bold text-gray-600 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">favorite</span> {post.likes}
                                        </button>
                                        <button className="flex items-center gap-1 font-bold text-gray-600 hover:text-secondary transition-colors">
                                            <span className="material-symbols-outlined">chat_bubble</span> {post.comments}
                                        </button>
                                    </div>
                                    <button className="px-4 py-2 bg-primary text-white font-bold border-2 border-black neo-shadow-sm neo-btn flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">content_copy</span> Copy Trip
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Sidebar */}
                    <div className="flex flex-col gap-8">
                        
                        {/* Trending */}
                        <div className="bg-white border-2 border-black neo-shadow p-6">
                            <h2 className="text-xl font-headline font-black mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">trending_up</span> Trending Destinations
                            </h2>
                            <ul className="space-y-4">
                                {['Kyoto, Japan', 'Amalfi Coast, Italy', 'Banff, Canada', 'Bali, Indonesia', 'Cape Town, SA'].map((dest, i) => (
                                    <li key={i} className="flex items-center gap-3 group cursor-pointer">
                                        <span className="w-6 h-6 rounded-full bg-surface border-2 border-black flex items-center justify-center font-black text-xs text-primary flex-shrink-0 group-hover:scale-110 transition-transform">{i + 1}</span>
                                        <span className="font-bold flex-grow group-hover:text-primary transition-colors">{dest}</span>
                                        <span className="material-symbols-outlined text-gray-300 group-hover:text-black transition-colors">arrow_forward</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Popular Templates */}
                        <div className="bg-white border-2 border-black neo-shadow p-6">
                            <h2 className="text-xl font-headline font-black mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary">file_copy</span> Popular Templates
                            </h2>
                            <div className="space-y-4">
                                <div className="border-2 border-black group">
                                    <div className="h-24 bg-amber-200 border-b-2 border-black flex items-center justify-center">
                                        <span className="material-symbols-outlined text-black/20 text-4xl">beach_access</span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-black mb-1">7 Days in Bali</h3>
                                        <button className="w-full mt-2 py-1 bg-white text-black font-bold border-2 border-black neo-shadow-sm hover:bg-surface transition-colors text-sm">Use Template</button>
                                    </div>
                                </div>
                                <div className="border-2 border-black group">
                                    <div className="h-24 bg-teal-200 border-b-2 border-black flex items-center justify-center">
                                        <span className="material-symbols-outlined text-black/20 text-4xl">domain</span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-black mb-1">NYC Weekend Guide</h3>
                                        <button className="w-full mt-2 py-1 bg-white text-black font-bold border-2 border-black neo-shadow-sm hover:bg-surface transition-colors text-sm">Use Template</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default Community;
