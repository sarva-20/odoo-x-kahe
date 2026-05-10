import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';

const SearchResults = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedResult, setSelectedResult] = useState(null);

    const categories = ['All', 'Adventure', 'Culture', 'Food', 'Nature'];

    const mockResults = [
        {
            id: 1,
            name: 'Mount Fuji Guided Sunrise Hike',
            category: 'Adventure',
            cost: 150.00,
            duration: '12 hours',
            rating: 4.8,
            reviews: 342,
            coords: { x: '70%', y: '30%' }
        },
        {
            id: 2,
            name: 'Traditional Tea Ceremony',
            category: 'Culture',
            cost: 45.00,
            duration: '2 hours',
            rating: 4.9,
            reviews: 856,
            coords: { x: '65%', y: '40%' }
        },
        {
            id: 3,
            name: 'Tsukiji Outer Market Food Tour',
            category: 'Food',
            cost: 85.00,
            duration: '3 hours',
            rating: 4.7,
            reviews: 512,
            coords: { x: '75%', y: '45%' }
        },
        {
            id: 4,
            name: 'Arashiyama Bamboo Grove Walk',
            category: 'Nature',
            cost: 0.00,
            duration: '2 hours',
            rating: 4.9,
            reviews: 1204,
            coords: { x: '60%', y: '50%' }
        }
    ];

    const filteredResults = activeCategory === 'All' 
        ? mockResults 
        : mockResults.filter(r => r.category === activeCategory);

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="plan" />
            
            <main className="relative z-10 max-w-[1400px] mx-auto px-4 py-8 flex-grow w-full flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
                
                {/* Left Panel - 40% */}
                <div className="lg:w-[40%] flex flex-col h-full bg-white border-2 border-black neo-shadow-lg overflow-hidden">
                    
                    {/* Search Header */}
                    <div className="p-6 border-b-2 border-black bg-surface relative z-10">
                        <div className="relative mb-4">
                            <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">search</span>
                            <input 
                                className="neo-input w-full p-3 pl-10 border-2 border-black font-bold focus:border-primary bg-white"
                                placeholder="Search activities in Japan..."
                                defaultValue="Japan"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`px-3 py-1 font-bold text-sm border-2 border-black rounded-full transition-all ${activeCategory === cat ? 'bg-primary text-white neo-shadow-sm' : 'bg-white text-black hover:bg-gray-100'}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results List */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-4">
                        <p className="font-bold text-gray-500 mb-2">{filteredResults.length} activities found</p>
                        
                        {filteredResults.map(result => (
                            <div 
                                key={result.id} 
                                className={`border-2 border-black border-l-8 neo-shadow p-4 cursor-pointer transition-transform hover:-translate-y-1 ${selectedResult?.id === result.id ? 'bg-amber-50 border-l-primary' : 'bg-white border-l-secondary'}`}
                                onClick={() => setSelectedResult(result)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-headline font-black text-lg pr-4">{result.name}</h3>
                                    <span className="bg-gray-100 px-2 py-0.5 text-xs font-bold border-2 border-black whitespace-nowrap">{result.category}</span>
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm font-bold text-gray-600 mb-4">
                                    <span className="flex items-center gap-1 text-primary">
                                        <span className="material-symbols-outlined text-sm">payments</span> 
                                        {result.cost === 0 ? 'Free' : `$${result.cost.toFixed(2)}`}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">schedule</span> 
                                        {result.duration}
                                    </span>
                                    <span className="flex items-center gap-1 text-amber-500">
                                        <span className="material-symbols-outlined text-sm">star</span> 
                                        {result.rating} ({result.reviews})
                                    </span>
                                </div>

                                <button className="w-full py-2 bg-primary text-white font-bold border-2 border-black neo-shadow-sm neo-btn flex justify-center items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">add</span> Add to Trip
                                </button>
                            </div>
                        ))}
                        
                        {filteredResults.length === 0 && (
                            <div className="text-center p-8 border-2 border-dashed border-gray-300 font-bold text-gray-400">
                                No activities found for this category.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Map (60%) */}
                <div className="lg:w-[60%] h-[400px] lg:h-full bg-secondary border-2 border-black neo-shadow-lg relative overflow-hidden flex items-center justify-center">
                    
                    {/* SVG Map Illustration Placeholder */}
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 600" preserveAspectRatio="none">
                        <path d="M 100 200 Q 250 50 400 300 T 700 150 L 800 600 L 0 600 Z" fill="#003540" />
                        <path d="M 50 400 Q 300 150 550 400 T 900 250 L 800 600 L 0 600 Z" fill="#002A33" />
                    </svg>

                    {/* Map Pins */}
                    {filteredResults.map(result => (
                        <div 
                            key={result.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                            style={{ left: result.coords.x, top: result.coords.y }}
                            onClick={() => setSelectedResult(result)}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform ${selectedResult?.id === result.id ? 'bg-primary scale-150 animate-pulse' : 'bg-amber-400 group-hover:scale-125'}`}></div>
                        </div>
                    ))}

                    {/* Selected Item Popup */}
                    {selectedResult && (
                        <div className="absolute top-4 right-4 bg-white border-2 border-black neo-shadow p-4 w-64 animate-slide-in">
                            <button 
                                className="absolute top-2 right-2 text-gray-400 hover:text-black"
                                onClick={() => setSelectedResult(null)}
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                            <div className="w-full h-24 bg-gray-200 border-2 border-black mb-3 flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-400 text-3xl">landscape</span>
                            </div>
                            <h3 className="font-headline font-black leading-tight mb-1">{selectedResult.name}</h3>
                            <p className="text-primary font-black mb-3">{selectedResult.cost === 0 ? 'Free' : `$${selectedResult.cost.toFixed(2)}`}</p>
                            <button className="w-full py-1.5 bg-primary text-white font-bold text-sm border-2 border-black neo-shadow-sm neo-btn">Add +</button>
                        </div>
                    )}

                    {/* Map Controls */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                        <button className="w-10 h-10 bg-white border-2 border-black neo-shadow-sm flex items-center justify-center font-black text-xl hover:bg-gray-100">+</button>
                        <button className="w-10 h-10 bg-white border-2 border-black neo-shadow-sm flex items-center justify-center font-black text-xl hover:bg-gray-100">-</button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default SearchResults;
