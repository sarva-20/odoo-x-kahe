import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';
import API_BASE_URL from '../config/api.js';

const Checklist = () => {
    const [trips, setTrips] = useState([]);
    const [selectedTripId, setSelectedTripId] = useState('');
    
    // Default categories and items
    const [items, setItems] = useState([
        { id: 'd1', category: 'Documents', item: 'Passport', isPacked: false },
        { id: 'd2', category: 'Documents', item: 'Flight Tickets', isPacked: false },
        { id: 'd3', category: 'Documents', item: 'Travel Insurance', isPacked: false },
        { id: 'd4', category: 'Documents', item: 'Hotel Confirmation', isPacked: false },
        { id: 'c1', category: 'Clothing', item: 'Casual Shirts', isPacked: false },
        { id: 'c2', category: 'Clothing', item: 'Trousers', isPacked: false },
        { id: 'c3', category: 'Clothing', item: 'Walking Shoes', isPacked: false },
        { id: 'c4', category: 'Clothing', item: 'Light Jacket', isPacked: false },
        { id: 'e1', category: 'Electronics', item: 'Phone Charger', isPacked: false },
        { id: 'e2', category: 'Electronics', item: 'Universal Adapter', isPacked: false },
        { id: 'e3', category: 'Electronics', item: 'Earphones', isPacked: false },
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newItemText, setNewItemText] = useState('');
    const [newItemCategory, setNewItemCategory] = useState('Documents');

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_BASE_URL}/api/trips/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await res.json();
                if (json.success && json.data.length > 0) {
                    setTrips(json.data);
                    setSelectedTripId(json.data[0].id.toString());
                }
            } catch (err) {
                console.error("Failed to fetch trips", err);
            }
        };
        fetchTrips();
    }, []);

    const toggleItem = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, isPacked: !item.isPacked } : item));
    };

    const resetAll = () => {
        setItems(items.map(item => ({ ...item, isPacked: false })));
    };

    const handleAddItem = async () => {
        if (!newItemText.trim() || !selectedTripId) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/api/trips/${selectedTripId}/checklist`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ item: newItemText, category: newItemCategory })
            });

            if (res.ok) {
                const json = await res.json();
                const newItem = {
                    id: json.data?.id || Date.now().toString(),
                    category: newItemCategory,
                    item: newItemText,
                    isPacked: false
                };
                setItems([...items, newItem]);
                setNewItemText('');
                setShowAddForm(false);
            }
        } catch (err) {
            console.error("Failed to add checklist item", err);
        }
    };

    const categories = ['Documents', 'Clothing', 'Electronics'];
    const totalItems = items.length;
    const packedItems = items.filter(i => i.isPacked).length;
    const progressPercent = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

    const getCategoryIcon = (cat) => {
        switch(cat) {
            case 'Documents': return 'credit_card';
            case 'Clothing': return 'styler';
            case 'Electronics': return 'power';
            default: return 'category';
        }
    };

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            
            <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-4xl font-headline font-black flex items-center gap-2">
                        <span className="material-symbols-outlined text-4xl text-primary">inventory</span> 
                        Packing List
                    </h1>
                    
                    {trips.length > 0 && (
                        <select 
                            className="neo-input p-3 border-2 border-primary bg-white font-bold text-lg cursor-pointer outline-none w-full md:w-64 neo-shadow-sm"
                            value={selectedTripId}
                            onChange={(e) => setSelectedTripId(e.target.value)}
                        >
                            {trips.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="bg-white p-6 border-2 border-black neo-shadow-lg mb-8 max-w-3xl mx-auto">
                    <div className="flex justify-between font-bold mb-2">
                        <span>Packing Progress</span>
                        <span className="text-primary">{packedItems} of {totalItems} items packed</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 border-2 border-black rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-primary transition-all duration-500 ease-out" 
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {categories.map(cat => {
                        const catItems = items.filter(i => i.category === cat);
                        if (catItems.length === 0) return null;
                        const catPacked = catItems.filter(i => i.isPacked).length;

                        return (
                            <div key={cat} className="bg-white border-2 border-black neo-shadow p-6 relative">
                                <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
                                <div className="flex justify-between items-center mb-4 pl-4">
                                    <h2 className="text-2xl font-headline font-black flex items-center gap-2">
                                        <span className="material-symbols-outlined">{getCategoryIcon(cat)}</span>
                                        {cat}
                                    </h2>
                                    <span className="bg-gray-200 px-3 py-1 font-bold text-sm border-2 border-black rounded-full">
                                        {catPacked}/{catItems.length}
                                    </span>
                                </div>
                                <div className="space-y-3 pl-4">
                                    {catItems.map(item => (
                                        <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors
                                                ${item.isPacked ? 'bg-primary' : 'bg-white group-hover:bg-gray-100'}`}>
                                                {item.isPacked && <span className="material-symbols-outlined text-white text-sm font-bold">check</span>}
                                            </div>
                                            <span className={`font-bold text-lg select-none transition-all ${item.isPacked ? 'line-through text-gray-400' : 'text-black'}`}>
                                                {item.item}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {showAddForm ? (
                        <div className="bg-amber-50 p-6 border-2 border-black neo-shadow flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-grow w-full">
                                <label className="block text-sm font-bold mb-1">Item Name</label>
                                <input 
                                    className="neo-input w-full p-3 border-2 border-black bg-white focus:border-primary" 
                                    placeholder="e.g. Sunglasses"
                                    value={newItemText}
                                    onChange={e => setNewItemText(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="w-full md:w-48">
                                <label className="block text-sm font-bold mb-1">Category</label>
                                <select 
                                    className="neo-input w-full p-3 border-2 border-black bg-white focus:border-primary"
                                    value={newItemCategory}
                                    onChange={e => setNewItemCategory(e.target.value)}
                                >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                                <button onClick={() => setShowAddForm(false)} className="px-4 py-3 bg-white border-2 border-black font-bold neo-shadow-sm neo-btn flex-1 md:flex-none">Cancel</button>
                                <button onClick={handleAddItem} className="px-4 py-3 bg-primary text-white border-2 border-black font-bold neo-shadow-sm neo-btn flex-1 md:flex-none">Save</button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-4 mt-8">
                            <button 
                                className="flex-1 py-4 bg-primary text-white font-bold text-xl border-2 border-black neo-shadow neo-btn flex items-center justify-center gap-2"
                                onClick={() => setShowAddForm(true)}
                            >
                                <span className="material-symbols-outlined">add</span> Add Item
                            </button>
                            <button 
                                className="flex-1 py-4 bg-white text-black font-bold text-xl border-2 border-black neo-shadow neo-btn flex items-center justify-center gap-2"
                                onClick={resetAll}
                            >
                                <span className="material-symbols-outlined">refresh</span> Reset All
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Checklist;
