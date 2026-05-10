import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';
import AirplaneTransition from '../components/AirplaneTransition';
import { createTrip, createStop } from '../services/trips';

const PlanTrip = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [showAirplane, setShowAirplane] = useState(false);
    const [errors, setErrors] = useState({});

    // Form Data State
    const [tripData, setTripData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        coverPhoto: null
    });

    const [destinations, setDestinations] = useState([]);
    const [newDest, setNewDest] = useState({ city: '', arrivalDate: '', departureDate: '' });

    const [budgetData, setBudgetData] = useState({
        total: '',
        transport: '',
        hotel: '',
        activities: '',
        meals: ''
    });

    const remainingBudget = (parseFloat(budgetData.total || 0) 
        - parseFloat(budgetData.transport || 0) 
        - parseFloat(budgetData.hotel || 0) 
        - parseFloat(budgetData.activities || 0) 
        - parseFloat(budgetData.meals || 0)).toFixed(2);

    const isBudgetOver = parseFloat(remainingBudget) < 0;

    const handleNext = () => {
        const newErrors = {};
        if (step === 1) {
            if (!tripData.name) newErrors.name = 'Trip Name is required';
            if (!tripData.startDate) newErrors.startDate = 'Start Date is required';
            if (!tripData.endDate) newErrors.endDate = 'End Date is required';
            if (tripData.startDate && tripData.endDate && new Date(tripData.startDate) > new Date(tripData.endDate)) {
                newErrors.endDate = 'End Date cannot be before Start Date';
            }
        } else if (step === 2) {
            if (destinations.length === 0) {
                newErrors.destinations = 'At least 1 destination is required';
            }
        } else if (step === 3) {
            if (!budgetData.total || parseFloat(budgetData.total) <= 0) {
                newErrors.total = 'Total budget is required';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setStep(prev => prev + 1);
    };

    const handleBack = () => setStep(prev => prev - 1);

    const handleAddDestination = () => {
        if (newDest.city && newDest.arrivalDate && newDest.departureDate) {
            setDestinations([...destinations, newDest]);
            setNewDest({ city: '', arrivalDate: '', departureDate: '' });
            setErrors({});
        } else {
            setErrors({ ...errors, newDest: 'Please fill out city and both dates' });
        }
    };

    const handleRemoveDest = (index) => {
        setDestinations(destinations.filter((_, i) => i !== index));
    };

    const moveDest = (index, direction) => {
        if (direction === 'up' && index > 0) {
            const newDests = [...destinations];
            [newDests[index - 1], newDests[index]] = [newDests[index], newDests[index - 1]];
            setDestinations(newDests);
        } else if (direction === 'down' && index < destinations.length - 1) {
            const newDests = [...destinations];
            [newDests[index + 1], newDests[index]] = [newDests[index], newDests[index + 1]];
            setDestinations(newDests);
        }
    };

    const handleCreateTrip = async () => {
        try {
            setErrors({});
            // 1. Create Trip
            const payload = {
                name: tripData.name,
                startDate: new Date(tripData.startDate).toISOString(),
                endDate: new Date(tripData.endDate).toISOString(),
                description: tripData.description,
                budgetAmount: parseFloat(budgetData.total || 0)
            };

            const tripRes = await createTrip(payload);
            
            if (!tripRes.success) {
                setErrors({ submit: tripRes.message || 'Failed to create trip' });
                return;
            }

            const tripId = tripRes.data.id;

            // 2. Create Stops (Destinations)
            for (const dest of destinations) {
                await createStop(tripId, {
                    cityName: dest.city,
                    arrivalDate: new Date(dest.arrivalDate).toISOString(),
                    departureDate: new Date(dest.departureDate).toISOString()
                });
            }

            // Success -> Show Airplane and Navigate
            setShowAirplane(true);
        } catch (error) {
            setErrors({ submit: 'Network error. Please try again later.' });
        }
    };

    const StepHeader = ({ title }) => (
        <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-primary">{title}</h2>
        </div>
    );

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="plan" />
            
            {showAirplane && <AirplaneTransition onComplete={() => navigate('/builder')} />}

            <main className="relative z-10 max-w-[800px] mx-auto px-4 py-8 flex-grow w-full flex flex-col justify-center">
                <div className="bg-white border-2 border-black rounded-xl neo-shadow-lg overflow-hidden flex flex-col relative min-h-[600px]">
                    
                    {/* Advanced Step Indicator */}
                    <div className="relative pt-8 pb-4 px-12">
                        {/* Progress Line */}
                        <div className="absolute top-[50px] left-16 right-16 h-1 bg-gray-200 -z-10 -mt-0.5">
                            <div 
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${((step - 1) / 3) * 100}%` }}
                            />
                        </div>
                        
                        <div className="flex justify-between relative z-10">
                            {[1, 2, 3, 4].map(num => {
                                const isCompleted = step > num;
                                const isActive = step === num;
                                return (
                                    <div 
                                        key={num} 
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 border-black
                                            ${isCompleted ? 'bg-secondary text-white' : 
                                              isActive ? 'bg-primary text-white scale-110' : 
                                              'bg-white text-gray-400'}`}
                                    >
                                        {isCompleted ? <span className="material-symbols-outlined text-sm font-bold">check</span> : num}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Conveyor Belt Container */}
                    <div className="relative w-full flex-grow overflow-hidden">
                        
                        {/* STEP 1: Trip Basics */}
                        <div 
                            className={`absolute inset-0 w-full px-8 pb-8 pt-2 transition-slide
                                ${step === 1 ? 'translate-x-0 opacity-100 relative' : 
                                  step > 1 ? '-translate-x-full opacity-0 pointer-events-none' : 
                                  'translate-x-full opacity-0 pointer-events-none'}`}
                        >
                            <StepHeader title="Trip Basics" />
                            <div className="space-y-4">
                                <div>
                                    <label className="font-bold block mb-1">Trip Name</label>
                                    <input 
                                        className={`neo-input w-full p-3 border-2 rounded-none bg-white focus:border-primary ${errors.name ? 'border-error' : 'border-black'}`} 
                                        placeholder="e.g. Summer in Tokyo" 
                                        value={tripData.name}
                                        onChange={e => setTripData({...tripData, name: e.target.value})}
                                    />
                                    {errors.name && <p className="text-error text-xs font-bold mt-1">{errors.name}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-bold block mb-1">Start Date</label>
                                        <input 
                                            type="date"
                                            className={`neo-input w-full p-3 border-2 rounded-none bg-white focus:border-primary ${errors.startDate ? 'border-error' : 'border-black'}`} 
                                            value={tripData.startDate}
                                            onChange={e => setTripData({...tripData, startDate: e.target.value})}
                                        />
                                        {errors.startDate && <p className="text-error text-xs font-bold mt-1">{errors.startDate}</p>}
                                    </div>
                                    <div>
                                        <label className="font-bold block mb-1">End Date</label>
                                        <input 
                                            type="date"
                                            className={`neo-input w-full p-3 border-2 rounded-none bg-white focus:border-primary ${errors.endDate ? 'border-error' : 'border-black'}`} 
                                            value={tripData.endDate}
                                            onChange={e => setTripData({...tripData, endDate: e.target.value})}
                                        />
                                        {errors.endDate && <p className="text-error text-xs font-bold mt-1">{errors.endDate}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="font-bold block mb-1">Description (Optional)</label>
                                    <textarea 
                                        className="neo-input w-full p-3 border-2 border-black rounded-none bg-white focus:border-primary resize-none h-24" 
                                        placeholder="What's the vibe?"
                                        value={tripData.description}
                                        onChange={e => setTripData({...tripData, description: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="font-bold block mb-1">Cover Photo</label>
                                    <div className="w-full h-24 border-2 border-dashed border-black bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                        <span className="material-symbols-outlined text-primary text-3xl">photo_camera</span>
                                        <span className="text-sm font-bold text-gray-500 mt-1">Upload an image</span>
                                    </div>
                                </div>
                                
                                <button 
                                    className="w-full mt-4 py-4 bg-primary text-white font-bold text-xl neo-shadow neo-btn transition-all border-2 border-black" 
                                    onClick={handleNext}
                                >
                                    Next: Add Destinations
                                </button>
                            </div>
                        </div>

                        {/* STEP 2: Add Destinations */}
                        <div 
                            className={`absolute inset-0 w-full px-8 pb-8 pt-2 transition-slide flex flex-col
                                ${step === 2 ? 'translate-x-0 opacity-100 relative' : 
                                  step > 2 ? '-translate-x-full opacity-0 pointer-events-none' : 
                                  'translate-x-full opacity-0 pointer-events-none'}`}
                        >
                            <StepHeader title="Add Destinations" />
                            
                            <div className="flex-grow flex flex-col space-y-4">
                                {/* Search/Add Bar */}
                                <div className="bg-white p-4 border-2 border-black neo-shadow-sm flex flex-col gap-3">
                                    <input 
                                        className="neo-input w-full p-3 border-2 border-black focus:border-primary" 
                                        placeholder="Search city (e.g. Paris)" 
                                        value={newDest.city}
                                        onChange={e => setNewDest({...newDest, city: e.target.value})}
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input 
                                            type="date"
                                            className="neo-input w-full p-2 border-2 border-black text-sm" 
                                            value={newDest.arrivalDate}
                                            onChange={e => setNewDest({...newDest, arrivalDate: e.target.value})}
                                        />
                                        <input 
                                            type="date"
                                            className="neo-input w-full p-2 border-2 border-black text-sm" 
                                            value={newDest.departureDate}
                                            onChange={e => setNewDest({...newDest, departureDate: e.target.value})}
                                        />
                                    </div>
                                    {errors.newDest && <p className="text-error text-xs font-bold">{errors.newDest}</p>}
                                    <button 
                                        className="w-full py-2 bg-secondary text-white font-bold neo-shadow-sm neo-btn transition-all border-2 border-black" 
                                        onClick={handleAddDestination}
                                    >
                                        + Add Stop
                                    </button>
                                </div>

                                {/* List of Stops */}
                                <div className="flex-grow overflow-y-auto space-y-2 pb-4">
                                    {destinations.map((dest, i) => (
                                        <div key={i} className="bg-white border-2 border-black p-3 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col gap-1">
                                                    <button onClick={() => moveDest(i, 'up')} className="hover:text-primary leading-none"><span className="material-symbols-outlined text-sm">keyboard_arrow_up</span></button>
                                                    <button onClick={() => moveDest(i, 'down')} className="hover:text-primary leading-none"><span className="material-symbols-outlined text-sm">keyboard_arrow_down</span></button>
                                                </div>
                                                <div>
                                                    <p className="font-black text-lg">{dest.city}</p>
                                                    <p className="text-xs font-bold text-gray-500">{new Date(dest.arrivalDate).toLocaleDateString()} - {new Date(dest.departureDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => handleRemoveDest(i)} className="text-gray-400 hover:text-error">
                                                <span className="material-symbols-outlined">close</span>
                                            </button>
                                        </div>
                                    ))}
                                    {destinations.length === 0 && (
                                        <div className="text-center p-6 border-2 border-dashed border-gray-300 mt-4">
                                            <span className="material-symbols-outlined text-4xl text-gray-300">location_on</span>
                                            <p className="text-gray-400 font-bold mt-2">No destinations added yet.</p>
                                        </div>
                                    )}
                                </div>
                                {errors.destinations && <p className="text-error text-center font-bold mb-2">{errors.destinations}</p>}
                            </div>

                            <div className="flex gap-4 pt-4 mt-auto">
                                <button 
                                    className="flex-1 py-4 bg-white text-black border-2 border-black font-bold text-xl neo-shadow neo-btn transition-all" 
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                                <button 
                                    className="flex-1 py-4 bg-primary text-white font-bold text-xl neo-shadow neo-btn transition-all border-2 border-black" 
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        {/* STEP 3: Set Budget */}
                        <div 
                            className={`absolute inset-0 w-full px-8 pb-8 pt-2 transition-slide flex flex-col
                                ${step === 3 ? 'translate-x-0 opacity-100 relative' : 
                                  step > 3 ? '-translate-x-full opacity-0 pointer-events-none' : 
                                  'translate-x-full opacity-0 pointer-events-none'}`}
                        >
                            <StepHeader title="Set Your Budget" />
                            
                            <div className="space-y-6 flex-grow">
                                <div>
                                    <label className="font-bold block mb-1 text-lg">Total Budget</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-4 font-black text-xl">$</span>
                                        <input 
                                            type="number"
                                            className={`neo-input w-full p-4 pl-10 border-2 bg-white text-xl font-black ${errors.total ? 'border-error' : 'border-black focus:border-primary'}`} 
                                            placeholder="0.00" 
                                            value={budgetData.total}
                                            onChange={e => setBudgetData({...budgetData, total: e.target.value})}
                                        />
                                    </div>
                                    {errors.total && <p className="text-error text-xs font-bold mt-1">{errors.total}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Transport */}
                                    <div>
                                        <label className="font-bold text-sm flex items-center gap-1 mb-1"><span className="material-symbols-outlined text-sm">flight_takeoff</span> Transport</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 font-bold">$</span>
                                            <input type="number" className="neo-input w-full p-3 pl-8 border-2 border-black text-sm font-bold bg-white focus:border-primary" placeholder="0" value={budgetData.transport} onChange={e => setBudgetData({...budgetData, transport: e.target.value})} />
                                        </div>
                                    </div>
                                    {/* Hotel */}
                                    <div>
                                        <label className="font-bold text-sm flex items-center gap-1 mb-1"><span className="material-symbols-outlined text-sm">hotel</span> Hotel</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 font-bold">$</span>
                                            <input type="number" className="neo-input w-full p-3 pl-8 border-2 border-black text-sm font-bold bg-white focus:border-primary" placeholder="0" value={budgetData.hotel} onChange={e => setBudgetData({...budgetData, hotel: e.target.value})} />
                                        </div>
                                    </div>
                                    {/* Activities */}
                                    <div>
                                        <label className="font-bold text-sm flex items-center gap-1 mb-1"><span className="material-symbols-outlined text-sm">local_activity</span> Activities</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 font-bold">$</span>
                                            <input type="number" className="neo-input w-full p-3 pl-8 border-2 border-black text-sm font-bold bg-white focus:border-primary" placeholder="0" value={budgetData.activities} onChange={e => setBudgetData({...budgetData, activities: e.target.value})} />
                                        </div>
                                    </div>
                                    {/* Meals */}
                                    <div>
                                        <label className="font-bold text-sm flex items-center gap-1 mb-1"><span className="material-symbols-outlined text-sm">restaurant</span> Meals</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 font-bold">$</span>
                                            <input type="number" className="neo-input w-full p-3 pl-8 border-2 border-black text-sm font-bold bg-white focus:border-primary" placeholder="0" value={budgetData.meals} onChange={e => setBudgetData({...budgetData, meals: e.target.value})} />
                                        </div>
                                    </div>
                                </div>

                                {/* Calculation */}
                                <div className={`p-4 border-2 border-black font-bold flex justify-between items-center ${isBudgetOver ? 'bg-red-100 text-error' : 'bg-green-100 text-green-800'}`}>
                                    <span>Remaining Unallocated:</span>
                                    <span className="text-xl font-black">${remainingBudget}</span>
                                </div>
                                {isBudgetOver && <p className="text-error text-center font-bold text-sm animate-pulse">Warning: Category totals exceed total budget!</p>}

                            </div>

                            <div className="flex gap-4 pt-4 mt-auto">
                                <button 
                                    className="flex-1 py-4 bg-white text-black border-2 border-black font-bold text-xl neo-shadow neo-btn transition-all" 
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                                <button 
                                    className="flex-1 py-4 bg-primary text-white font-bold text-xl neo-shadow neo-btn transition-all border-2 border-black" 
                                    onClick={handleNext}
                                >
                                    Review
                                </button>
                            </div>
                        </div>

                        {/* STEP 4: Confirm & Create */}
                        <div 
                            className={`absolute inset-0 w-full px-8 py-6 transition-slide flex flex-col
                                ${step === 4 ? 'translate-x-0 opacity-100 relative' : 
                                  'translate-x-full opacity-0 pointer-events-none'}`}
                        >
                            <StepHeader title="Ready for takeoff?" />
                            
                            <div className="flex-grow space-y-4">
                                <div className="bg-white border-2 border-black neo-shadow p-6">
                                    <h3 className="text-2xl font-black mb-1">{tripData.name}</h3>
                                    <p className="font-bold text-gray-500 mb-4">{new Date(tripData.startDate).toLocaleDateString()} to {new Date(tripData.endDate).toLocaleDateString()}</p>
                                    
                                    <div className="mb-4">
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Destinations</p>
                                        <div className="flex flex-wrap gap-2">
                                            {destinations.map((d, i) => (
                                                <span key={i} className="px-3 py-1 bg-secondary text-white font-bold text-sm border-2 border-black neo-shadow-sm rounded-full">
                                                    {d.city}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Total Budget</p>
                                        <p className="text-xl font-black text-primary">${budgetData.total || 0}</p>
                                    </div>
                                </div>
                                
                                {errors.submit && <div className="p-3 bg-red-100 text-error font-bold border-2 border-error">{errors.submit}</div>}
                            </div>

                            <div className="flex gap-4 pt-4 mt-auto">
                                <button 
                                    className="flex-1 py-4 bg-white text-black border-2 border-black font-bold text-xl neo-shadow neo-btn transition-all" 
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                                <button 
                                    className="flex-1 py-4 bg-primary text-white font-bold text-xl neo-shadow neo-btn transition-all border-2 border-black" 
                                    onClick={handleCreateTrip}
                                >
                                    Create Trip
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PlanTrip;
