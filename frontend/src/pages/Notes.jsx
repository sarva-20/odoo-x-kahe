import React, { useState, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';
import API_BASE_URL from '../config/api.js';

const Notes = () => {
    const [trips, setTrips] = useState([]);
    const [selectedTripId, setSelectedTripId] = useState('');
    const [notes, setNotes] = useState([]);
    
    const [filter, setFilter] = useState('All'); // All, By Day, By Stop
    
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    
    const [formData, setFormData] = useState({ title: '', body: '', tag: '' });

    // Fetch Trips
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

    // Load notes from localStorage when selectedTripId changes
    useEffect(() => {
        if (selectedTripId) {
            const savedNotes = localStorage.getItem(`notes_${selectedTripId}`);
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes));
            } else {
                setNotes([]);
            }
        }
    }, [selectedTripId]);

    // Save notes to localStorage
    const saveNotesToLocal = (newNotes) => {
        setNotes(newNotes);
        if (selectedTripId) {
            localStorage.setItem(`notes_${selectedTripId}`, JSON.stringify(newNotes));
        }
    };

    const handleSaveNote = () => {
        if (!formData.title.trim() && !formData.body.trim()) return;

        if (editingNoteId) {
            // Edit existing
            const newNotes = notes.map(n => n.id === editingNoteId ? { ...n, ...formData, timestamp: new Date().toISOString() } : n);
            saveNotesToLocal(newNotes);
        } else {
            // Add new
            const newNote = {
                id: Date.now().toString(),
                ...formData,
                timestamp: new Date().toISOString()
            };
            saveNotesToLocal([newNote, ...notes]);
        }

        setFormData({ title: '', body: '', tag: '' });
        setShowAddForm(false);
        setEditingNoteId(null);
    };

    const handleEditClick = (note) => {
        setFormData({ title: note.title, body: note.body, tag: note.tag || '' });
        setEditingNoteId(note.id);
        setShowAddForm(true);
    };

    const handleDeleteNote = (id) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            saveNotesToLocal(notes.filter(n => n.id !== id));
        }
    };

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            
            <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-4xl font-headline font-black flex items-center gap-2">
                        <span className="material-symbols-outlined text-4xl text-primary">edit_note</span> 
                        Trip Notes
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

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex gap-2 w-full md:w-auto">
                        {['All', 'By Day', 'By Stop'].map(f => (
                            <button 
                                key={f}
                                className={`px-4 py-2 font-bold border-2 border-black rounded-full transition-all ${filter === f ? 'bg-primary text-white neo-shadow-sm' : 'bg-white text-black hover:bg-surface'}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    {!showAddForm && (
                        <button 
                            className="w-full md:w-auto px-6 py-3 bg-primary text-white font-bold border-2 border-black neo-shadow-sm neo-btn flex items-center justify-center gap-2"
                            onClick={() => {
                                setFormData({ title: '', body: '', tag: '' });
                                setEditingNoteId(null);
                                setShowAddForm(true);
                            }}
                        >
                            <span className="material-symbols-outlined">add</span> Add Note
                        </button>
                    )}
                </div>

                {showAddForm && (
                    <div className="bg-white border-2 border-black border-l-8 border-l-primary neo-shadow-lg p-6 mb-8">
                        <h2 className="text-xl font-headline font-black mb-4">{editingNoteId ? 'Edit Note' : 'Add New Note'}</h2>
                        <div className="space-y-4">
                            <input 
                                className="neo-input w-full p-3 border-2 border-black focus:border-primary font-bold text-lg" 
                                placeholder="Note Title"
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                autoFocus
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 mb-1 uppercase">Tag (Day/Stop)</label>
                                    <input 
                                        className="neo-input w-full p-2 border-2 border-black focus:border-primary font-bold text-sm" 
                                        placeholder="e.g. Day 1, Paris"
                                        value={formData.tag}
                                        onChange={e => setFormData({...formData, tag: e.target.value})}
                                    />
                                </div>
                            </div>
                            <textarea 
                                className="neo-input w-full p-3 border-2 border-black focus:border-primary font-bold resize-none h-32" 
                                placeholder="Jot down your thoughts, confirmation numbers, or addresses..."
                                value={formData.body}
                                onChange={e => setFormData({...formData, body: e.target.value})}
                            />
                            <div className="flex gap-4 pt-2">
                                <button className="flex-1 py-3 bg-white border-2 border-black font-bold neo-shadow-sm neo-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
                                <button className="flex-1 py-3 bg-primary text-white border-2 border-black font-bold neo-shadow-sm neo-btn" onClick={handleSaveNote}>Save Note</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.length > 0 ? notes.map(note => (
                        <div key={note.id} className="bg-white border-2 border-black border-l-8 border-l-secondary neo-shadow p-5 flex flex-col h-64 relative group">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEditClick(note)} className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                                <button onClick={() => handleDeleteNote(note.id)} className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center hover:text-error transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                            </div>
                            
                            {note.tag && <span className="bg-amber-100 text-amber-800 border-2 border-black px-2 py-0.5 text-xs font-bold inline-block mb-2 self-start">{note.tag}</span>}
                            <h3 className="font-headline font-black text-xl mb-2 line-clamp-1 pr-16">{note.title || 'Untitled Note'}</h3>
                            <p className="font-bold text-gray-700 flex-grow overflow-hidden line-clamp-4">{note.body}</p>
                            <p className="text-xs font-bold text-gray-400 mt-4 pt-4 border-t-2 border-gray-100">{new Date(note.timestamp).toLocaleString()}</p>
                        </div>
                    )) : !showAddForm && (
                        <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white border-2 border-dashed border-gray-300">
                            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">menu_book</span>
                            <p className="text-xl font-bold text-gray-400">Add your first note!</p>
                        </div>
                    )}
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default Notes;
