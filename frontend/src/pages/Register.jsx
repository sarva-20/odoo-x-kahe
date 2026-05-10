import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DoodleBackground from '../components/DoodleBackground';
import AirplaneTransition from '../components/AirplaneTransition';
import { registerUser } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [step, setStep] = useState(1);
    const [showAirplane, setShowAirplane] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
        city: '', country: '', phone: '', bio: '', preferences: []
    });
    
    const [errors, setErrors] = useState({});

    // Travel preferences options
    const travelOptions = ['Adventure', 'Beach', 'Culture', 'Food', 'City Breaks', 'Nature', 'Luxury', 'Budget'];

    const getPasswordStrength = (pass) => {
        if (!pass) return { score: 0, color: 'bg-gray-200' };
        let score = 0;
        if (pass.length >= 8) score += 1;
        if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score += 1;
        if (pass.length >= 12) score += 1;
        
        if (score === 0) return { score: 1, color: 'bg-error' };
        if (score === 1) return { score: 1, color: 'bg-error' }; // Weak
        if (score === 2) return { score: 2, color: 'bg-yellow-500' }; // Medium
        return { score: 3, color: 'bg-green-500' }; // Strong
    };

    const handleNext = () => {
        if (step === 1) {
            // Validate Step 1
            const newErrors = {};
            const nameRegex = /^[A-Za-z\s]+$/;
            if (!formData.firstName || !nameRegex.test(formData.firstName)) newErrors.firstName = 'Enter a valid first name';
            if (!formData.lastName || !nameRegex.test(formData.lastName)) newErrors.lastName = 'Enter a valid last name';
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email || !emailRegex.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
            if (!formData.password || formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
            
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
        }
        
        setErrors({});
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const togglePreference = (pref) => {
        setFormData(prev => ({
            ...prev,
            preferences: prev.preferences.includes(pref) 
                ? prev.preferences.filter(p => p !== pref)
                : [...prev.preferences, pref]
        }));
    };

    const handleStartExploring = async () => {
        try {
            const payload = {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                password: formData.password,
            };

            const response = await registerUser(payload);

            if (!response?.success || !response?.token) {
                setErrors((prev) => ({
                    ...prev,
                    submit: response?.message || 'Registration failed. Please try again.',
                }));
                return;
            }

            login(
                {
                    name: payload.name,
                    email: payload.email,
                },
                response.token
            );
            setShowAirplane(true);
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                submit: 'Unable to connect to server. Please try again.',
            }));
        }
    };

    const StepHeader = ({ title }) => (
        <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-primary">{title}</h2>
        </div>
    );

    // Render helpers
    const pwStrength = getPasswordStrength(formData.password);

    return (
        <div className="doodle-bg min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
            <DoodleBackground />
            {showAirplane && <AirplaneTransition onComplete={() => navigate('/home')} />}
            
            <main className="w-full max-w-lg bg-white border-2 border-primary rounded-xl neo-shadow-lg overflow-hidden flex flex-col relative z-10 min-h-[600px]">
                
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
                                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 
                                        ${isCompleted ? 'bg-secondary border-secondary text-white' : 
                                          isActive ? 'bg-primary border-primary text-white scale-110' : 
                                          'bg-white border-outline text-gray-400'}`}
                                >
                                    {isCompleted ? <span className="material-symbols-outlined text-sm font-bold">check</span> : num}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Conveyor Belt Container */}
                <div className="relative w-full flex-grow overflow-hidden">
                    
                    {/* STEP 1: Personal Info */}
                    <div 
                        className={`absolute inset-0 w-full px-8 pb-8 pt-2 transition-slide
                            ${step === 1 ? 'translate-x-0 opacity-100 relative' : 
                              step > 1 ? '-translate-x-full opacity-0 pointer-events-none' : 
                              'translate-x-full opacity-0 pointer-events-none'}`}
                    >
                        <h2 className="text-2xl font-black text-center mb-6">Who are you?</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input 
                                        className={`neo-input w-full p-3 border-2 rounded-md ${errors.firstName ? 'border-error' : 'border-primary'}`} 
                                        placeholder="First Name" 
                                        value={formData.firstName}
                                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                                    />
                                    {errors.firstName && <p className="text-error text-xs font-bold mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <input 
                                        className={`neo-input w-full p-3 border-2 rounded-md ${errors.lastName ? 'border-error' : 'border-primary'}`} 
                                        placeholder="Last Name" 
                                        value={formData.lastName}
                                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                                    />
                                    {errors.lastName && <p className="text-error text-xs font-bold mt-1">{errors.lastName}</p>}
                                </div>
                            </div>
                            <div>
                                <input 
                                    className={`neo-input w-full p-3 border-2 rounded-md ${errors.email ? 'border-error' : 'border-primary'}`} 
                                    placeholder="Email" 
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    onBlur={() => {
                                        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                                            setErrors(prev => ({...prev, email: 'Please enter a valid email address'}));
                                        } else {
                                            setErrors(prev => ({...prev, email: null}));
                                        }
                                    }}
                                />
                                {errors.email && <p className="text-error text-xs font-bold mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <input 
                                    className={`neo-input w-full p-3 border-2 rounded-md ${errors.password ? 'border-error' : 'border-primary'}`} 
                                    placeholder="Password" 
                                    type="password"
                                    value={formData.password}
                                    onChange={e => setFormData({...formData, password: e.target.value})}
                                    onBlur={() => {
                                        if (formData.password && formData.password.length < 8) {
                                            setErrors(prev => ({...prev, password: 'Password must be at least 8 characters'}));
                                        } else {
                                            setErrors(prev => ({...prev, password: null}));
                                        }
                                    }}
                                />
                                {/* Password Strength Bar */}
                                {formData.password && (
                                    <div className="flex gap-1 mt-2 h-1.5 w-full max-w-xs">
                                        <div className={`flex-1 rounded-full ${pwStrength.score >= 1 ? pwStrength.color : 'bg-gray-200'}`}></div>
                                        <div className={`flex-1 rounded-full ${pwStrength.score >= 2 ? pwStrength.color : 'bg-gray-200'}`}></div>
                                        <div className={`flex-1 rounded-full ${pwStrength.score >= 3 ? pwStrength.color : 'bg-gray-200'}`}></div>
                                    </div>
                                )}
                                {errors.password && <p className="text-error text-xs font-bold mt-1">{errors.password}</p>}
                            </div>
                            <div className="relative">
                                <input 
                                    className={`neo-input w-full p-3 border-2 rounded-md pr-10 ${errors.confirmPassword ? 'border-error' : 'border-primary'}`} 
                                    placeholder="Confirm Password" 
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                                    onBlur={() => {
                                        if (formData.confirmPassword && formData.confirmPassword !== formData.password) {
                                            setErrors(prev => ({...prev, confirmPassword: 'Passwords do not match'}));
                                        } else {
                                            setErrors(prev => ({...prev, confirmPassword: null}));
                                        }
                                    }}
                                />
                                {/* Live Match Check */}
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <span className="material-symbols-outlined absolute right-3 top-3 text-green-500 font-bold">check_circle</span>
                                )}
                                {errors.confirmPassword && <p className="text-error text-xs font-bold mt-1">{errors.confirmPassword}</p>}
                            </div>
                            <button 
                                className="w-full mt-4 py-4 bg-primary text-white font-bold text-xl rounded-md neo-shadow neo-btn transition-all" 
                                onClick={handleNext}
                            >
                                Next
                            </button>
                            <div className="text-center mt-4">
                                <p className="font-bold">Already have an account? <Link to="/" className="text-secondary underline decoration-2">Log In</Link></p>
                            </div>
                        </div>
                    </div>

                    {/* STEP 2: Location & Photo */}
                    <div 
                        className={`absolute inset-0 w-full px-8 py-6 transition-slide
                            ${step === 2 ? 'translate-x-0 opacity-100 relative' : 
                              step > 2 ? '-translate-x-full opacity-0 pointer-events-none' : 
                              'translate-x-full opacity-0 pointer-events-none'}`}
                    >
                        <StepHeader title="Where are you from?" />
                        <div className="absolute top-4 right-4 text-primary opacity-20"><span className="material-symbols-outlined text-6xl">landscape</span></div>
                        <div className="absolute bottom-10 left-4 text-primary opacity-20"><span className="material-symbols-outlined text-6xl">park</span></div>
                        
                        <div className="flex flex-col items-center mb-6 relative z-10">
                            <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary bg-surface flex flex-col items-center justify-center cursor-pointer hover:bg-surface-variant transition-colors group relative overflow-hidden">
                                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">photo_camera</span>
                            </div>
                            <p className="font-bold text-sm mt-2 text-on-surface-variant">Upload your travel photo</p>
                        </div>
                        
                        <div className="space-y-4">
                            <input 
                                className="neo-input w-full p-3 border-2 border-primary rounded-md" 
                                placeholder="City" 
                                value={formData.city}
                                onChange={e => setFormData({...formData, city: e.target.value})}
                            />
                            <select 
                                className="neo-input w-full p-3 border-2 border-primary rounded-md bg-white"
                                value={formData.country}
                                onChange={e => setFormData({...formData, country: e.target.value})}
                            >
                                <option value="" disabled>Select Country</option>
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="CA">Canada</option>
                                <option value="AU">Australia</option>
                                <option value="Other">Other</option>
                            </select>
                            <div>
                                <input 
                                    className={`neo-input w-full p-3 border-2 rounded-md ${errors.phone ? 'border-error' : 'border-primary'}`} 
                                    placeholder="Phone Number" 
                                    value={formData.phone}
                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                    onBlur={() => {
                                        if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
                                            setErrors(prev => ({...prev, phone: 'Enter a valid phone number'}));
                                        } else {
                                            setErrors(prev => ({...prev, phone: null}));
                                        }
                                    }}
                                />
                                {errors.phone ? <p className="text-error text-xs font-bold mt-1">{errors.phone}</p> : <p className="text-xs font-bold text-on-surface-variant text-right mt-1">Optional</p>}
                            </div>
                            
                            <div className="flex gap-4 pt-4">
                                <button 
                                    className="flex-1 py-4 bg-white text-primary border-2 border-primary font-bold text-xl rounded-md neo-shadow neo-btn transition-all" 
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                                <button 
                                    className="flex-1 py-4 bg-primary text-white font-bold text-xl rounded-md neo-shadow neo-btn transition-all" 
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* STEP 3: Travel Preferences */}
                    <div 
                        className={`absolute inset-0 w-full px-8 py-6 transition-slide
                            ${step === 3 ? 'translate-x-0 opacity-100 relative' : 
                              step > 3 ? '-translate-x-full opacity-0 pointer-events-none' : 
                              'translate-x-full opacity-0 pointer-events-none'}`}
                    >
                        <StepHeader title="Your travel style" />
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3 justify-center">
                                {travelOptions.map(option => {
                                    const isSelected = formData.preferences.includes(option);
                                    return (
                                        <button
                                            key={option}
                                            onClick={() => togglePreference(option)}
                                            className={`px-4 py-2 rounded-full font-bold border-2 border-primary transition-all hover:scale-105 bounce-pill neo-shadow-sm ${isSelected ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-surface'}`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            <div>
                                <textarea 
                                    className="neo-input w-full p-3 border-2 border-primary rounded-md min-h-[120px] resize-none" 
                                    placeholder="Tell us about yourself..."
                                    value={formData.bio}
                                    onChange={e => setFormData({...formData, bio: e.target.value})}
                                ></textarea>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button 
                                    className="flex-1 py-4 bg-white text-primary border-2 border-primary font-bold text-xl rounded-md neo-shadow neo-btn transition-all" 
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                                <button 
                                    className="flex-1 py-4 bg-primary text-white font-bold text-xl rounded-md neo-shadow neo-btn transition-all" 
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* STEP 4: Success */}
                    <div 
                        className={`absolute inset-0 w-full px-8 py-12 flex flex-col items-center justify-center text-center transition-slide
                            ${step === 4 ? 'translate-x-0 opacity-100 relative' : 
                              'translate-x-full opacity-0 pointer-events-none'}`}
                    >
                        <div className="w-24 h-24 mb-6 relative">
                            <svg className="w-full h-full" viewBox="0 0 52 52">
                                <circle className="stroke-primary" cx="26" cy="26" r="25" fill="none" strokeWidth="2" strokeDasharray="160" strokeDashoffset="0" />
                                {step === 4 && (
                                    <path 
                                        className="stroke-primary animate-draw-check" 
                                        fill="none" 
                                        strokeWidth="4" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M14 27l7 7 16-16" 
                                    />
                                )}
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-primary mb-2">Welcome to Traveloop, {formData.firstName || 'Traveler'}!</h2>
                        <p className="font-bold text-on-surface-variant text-lg mb-8">Your adventure starts now.</p>
                        {errors.submit && (
                            <p className="mb-4 text-sm font-bold text-error">{errors.submit}</p>
                        )}
                        
                        <button 
                            className="w-full py-4 bg-primary text-white font-bold text-xl rounded-md neo-shadow neo-btn transition-all" 
                            onClick={handleStartExploring}
                        >
                            Start Exploring
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;
