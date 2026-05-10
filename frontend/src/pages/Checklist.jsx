import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';
import { getTripById } from '../services/trips';
import { addChecklistItem, toggleChecklistItem } from '../services/utility';

const Checklist = () => {
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get('tripId');
    const [trip, setTrip] = useState(null);
    const [item, setItem] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const loadChecklist = async () => {
        if (!tripId) {
            setError('No trip selected.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await getTripById(tripId);

            if (!response?.success) {
                throw new Error(response?.message || 'Unable to load checklist');
            }

            setTrip(response.data);
        } catch (loadError) {
            setError(loadError.message || 'Unable to load checklist');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setError('');
        loadChecklist();
    }, [tripId]);

    const handleAddItem = async (event) => {
        event.preventDefault();
        if (!item.trim()) return;

        try {
            const response = await addChecklistItem(tripId, { item: item.trim(), category: 'General' });

            if (!response?.success) {
                throw new Error(response?.message || 'Unable to add checklist item');
            }

            setItem('');
            await loadChecklist();
        } catch (saveError) {
            setError(saveError.message || 'Unable to add checklist item');
        }
    };

    const handleToggle = async (itemId) => {
        try {
            const response = await toggleChecklistItem(itemId);

            if (!response?.success) {
                throw new Error(response?.message || 'Unable to update checklist item');
            }

            await loadChecklist();
        } catch (toggleError) {
            setError(toggleError.message || 'Unable to update checklist item');
        }
    };

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            <main className="max-w-[800px] mx-auto px-4 py-8 flex-grow w-full">
                <h1 className="text-4xl font-black mb-8">Packing Checklist</h1>
                {isLoading && <div className="bg-white border-2 border-black rounded-md neo-shadow p-4 mb-6 font-bold">Loading checklist...</div>}
                {error && <div className="bg-red-100 border-2 border-error rounded-md neo-shadow p-4 mb-6 font-bold text-error">{error}</div>}

                <form className="bg-white border-2 border-black rounded-md neo-shadow p-4 mb-6 flex gap-3" onSubmit={handleAddItem}>
                    <input className="flex-1 neo-input p-3 border-2 border-primary rounded-md" placeholder="Add a new checklist item" value={item} onChange={(event) => setItem(event.target.value)} />
                    <button type="submit" className="bg-primary text-white px-4 py-3 font-bold rounded-md border-2 border-black neo-shadow">Add</button>
                </form>

                <div className="bg-white border-2 border-black rounded-md neo-shadow p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">description</span> {trip?.name || 'Documents'}</h2>
                    <ul className="space-y-2">
                        {trip?.checklists?.length ? trip.checklists.map((checklistItem) => (
                            <li key={checklistItem.id} className="flex items-center gap-4 p-2 bg-surface border-2 border-black rounded-md neo-shadow-sm">
                                <input
                                    type="checkbox"
                                    checked={checklistItem.isPacked}
                                    onChange={() => handleToggle(checklistItem.id)}
                                    className="w-6 h-6 border-2 border-black rounded text-primary focus:ring-primary cursor-pointer"
                                />
                                <span className={`font-bold ${checklistItem.isPacked ? 'line-through opacity-70' : ''}`}>
                                    {checklistItem.item}
                                </span>
                            </li>
                        )) : <li className="font-bold text-on-surface-variant">No checklist items yet.</li>}
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Checklist;
