import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';
import API_BASE_URL from '../config/api.js';

const ItineraryBuilder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // We expect tripId to be passed in location.state or we fallback to 1 for testing
    const tripId = location.state?.tripId || 1;
    const tripName = location.state?.tripName || "My New Trip";
    
    const [sections, setSections] = useState([
        { id: Date.now(), type: 'Travel', title: '', description: '', startDate: '', endDate: '', budget: '' }
    ]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const handleAddSection = () => {
        setSections([
            ...sections,
            { id: Date.now(), type: 'Activity', title: '', description: '', startDate: '', endDate: '', budget: '' }
        ]);
    };

    const handleUpdateSection = (id, field, value) => {
        setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleRemoveSection = (id) => {
        setSections(sections.filter(s => s.id !== id));
    };

    const moveSection = (index, direction) => {
        if (direction === 'up' && index > 0) {
            const newSecs = [...sections];
            [newSecs[index - 1], newSecs[index]] = [newSecs[index], newSecs[index - 1]];
            setSections(newSecs);
        } else if (direction === 'down' && index < sections.length - 1) {
            const newSecs = [...sections];
            [newSecs[index + 1], newSecs[index]] = [newSecs[index], newSecs[index + 1]];
            setSections(newSecs);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError('');
            const token = localStorage.getItem('token');

            for (const sec of sections) {
                // The API expects stops/activities. We will map this builder's data to the closest backend model
                // The prompt says "POST /api/trips/:tripId/stops body: { title, type, description, startDate, endDate, budget }"
                // Note: The backend actual models might differ, but I am following the instructions literally.
                const payload = {
                    title: sec.title,
                    type: sec.type,
                    description: sec.description,
                    startDate: sec.startDate ? new Date(sec.startDate).toISOString() : null,
                    endDate: sec.endDate ? new Date(sec.endDate).toISOString() : null,
                    budget: parseFloat(sec.budget || 0)
                };

                const res = await fetch(`${API_BASE_URL}/api/trips/${tripId}/stops`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });
                
                if (!res.ok) {
                    throw new Error("Failed to save some sections");
                }
            }

            navigate('/itinerary-view', { state: { tripId } });
        } catch (err) {
            console.error(err);
            setError('Error saving itinerary. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="plan" />
            <main className="relative z-10 max-w-[800px] mx-auto px-4 py-8 flex-grow w-full">
                
                <div className="mb-8">
                    <h1 className="text-4xl font-headline font-black mb-2 flex items-center gap-2">Build Your Itinerary</h1>
                    <span className="bg-secondary text-white px-4 py-1 rounded-full font-bold border-2 border-black neo-shadow-sm inline-block">{tripName}</span>
                </div>

                {error && <div className="bg-red-100 text-error p-3 mb-4 font-bold border-2 border-error">{error}</div>}

                <div className="flex flex-col">
                    {sections.map((sec, i) => (
                        <div key={sec.id} className="relative flex flex-col">
                            {/* Card */}
                            <div className="bg-white border-2 border-black p-6 neo-shadow rounded-none relative z-10">
                                {/* Header row */}
                                <div className="flex justify-between items-start mb-4 gap-4">
                                    <div className="flex items-center gap-2 flex-grow">
                                        <div className="flex flex-col gap-1 mr-2">
                                            <button onClick={() => moveSection(i, 'up')} className="hover:text-primary leading-none"><span className="material-symbols-outlined text-xl">keyboard_arrow_up</span></button>
                                            <button onClick={() => moveSection(i, 'down')} className="hover:text-primary leading-none"><span className="material-symbols-outlined text-xl">keyboard_arrow_down</span></button>
                                        </div>
                                        <select 
                                            className="neo-input p-2 border-2 border-black font-bold outline-none focus:border-primary bg-white"
                                            value={sec.type}
                                            onChange={e => handleUpdateSection(sec.id, 'type', e.target.value)}
                                        >
                                            <option value="Travel">Travel</option>
                                            <option value="Hotel">Hotel</option>
                                            <option value="Activity">Activity</option>
                                        </select>
                                    </div>
                                    <button onClick={() => handleRemoveSection(sec.id)} className="text-gray-400 hover:text-error transition-colors">
                                        <span className="material-symbols-outlined text-2xl">delete</span>
                                    </button>
                                </div>

                                {/* Title */}
                                <input 
                                    className="w-full border-b-2 border-gray-300 focus:border-primary p-2 font-headline font-black text-2xl outline-none mb-4 bg-transparent" 
                                    placeholder="Section Title (e.g. Flight to Paris)" 
                                    value={sec.title}
                                    onChange={e => handleUpdateSection(sec.id, 'title', e.target.value)}
                                />

                                {/* Description */}
                                <textarea 
                                    className="w-full neo-input p-3 border-2 border-black focus:border-primary resize-none h-20 mb-4" 
                                    placeholder="Add notes, addresses, or confirmation numbers..."
                                    value={sec.description}
                                    onChange={e => handleUpdateSection(sec.id, 'description', e.target.value)}
                                />

                                {/* Dates & Budget */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">From</label>
                                        <input 
                                            className="w-full neo-input p-2 border-2 border-black focus:border-primary text-sm" 
                                            type="datetime-local" 
                                            value={sec.startDate}
                                            onChange={e => handleUpdateSection(sec.id, 'startDate', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">To</label>
                                        <input 
                                            className="w-full neo-input p-2 border-2 border-black focus:border-primary text-sm" 
                                            type="datetime-local" 
                                            value={sec.endDate}
                                            onChange={e => handleUpdateSection(sec.id, 'endDate', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Budget</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2 font-bold">$</span>
                                            <input 
                                                className="w-full neo-input p-2 pl-8 border-2 border-black focus:border-primary text-sm" 
                                                type="number" 
                                                placeholder="0.00"
                                                value={sec.budget}
                                                onChange={e => handleUpdateSection(sec.id, 'budget', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Connector */}
                            {i < sections.length - 1 && (
                                <div className="h-10 w-full flex justify-center items-center my-1">
                                    <div className="h-full border-l-4 border-dashed border-secondary relative">
                                        <div className="absolute -bottom-3 -left-[10px] text-secondary">
                                            <span className="material-symbols-outlined text-xl">arrow_downward</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {sections.length === 0 && (
                        <div className="text-center p-8 bg-white border-2 border-black neo-shadow font-bold text-gray-500">
                            No sections yet. Start building your itinerary!
                        </div>
                    )}
                </div>

                <div className="mt-8 space-y-4">
                    <button 
                        className="w-full py-4 border-4 border-dashed border-primary text-primary font-bold text-xl rounded-none hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                        onClick={handleAddSection}
                    >
                        <span className="material-symbols-outlined">add_circle</span> Add Section
                    </button>
                    <button 
                        className="w-full py-4 bg-primary text-white border-2 border-black font-bold text-xl neo-shadow neo-btn transition-all" 
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save Itinerary'}
                    </button>
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default ItineraryBuilder;
