import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import DoodleBackground from '../components/DoodleBackground';
import AirplaneTransition from '../components/AirplaneTransition';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showAirplane, setShowAirplane] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const [bannerMessage, setBannerMessage] = useState('');
    const [bannerType, setBannerType] = useState(''); // 'error' or 'success'
    
    const [forgotMsgVisible, setForgotMsgVisible] = useState(false);

    const validateEmail = (val) => {
        if (!val) return '';
        // basic regex for @ and .
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(val)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validatePassword = (val) => {
        if (!val) return '';
        if (val.length < 8) {
            return 'Password must be at least 8 characters';
        }
        return '';
    };

    const handleEmailBlur = () => {
        setEmailError(validateEmail(email));
    };

    const handlePasswordBlur = () => {
        setPasswordError(validatePassword(password));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBannerMessage('');
        
        // Empty check
        if (!email && !password) {
            setBannerType('error');
            setBannerMessage('Please fill in all fields');
            return;
        }

        const eError = validateEmail(email) || (!email ? 'Please enter a valid email address' : '');
        const pError = validatePassword(password) || (!password ? 'Password must be at least 8 characters' : '');
        
        setEmailError(eError);
        setPasswordError(pError);

        if (eError || pError) {
            return;
        }

        // Success
        setBannerType('success');
        setBannerMessage('Welcome back! Redirecting...');
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowAirplane(true);
        }, 1000);
    };

    const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();



    return (
        <div className="bg-white min-h-screen flex items-center justify-center relative overflow-hidden doodle-bg">
            <DoodleBackground />
            {showAirplane && <AirplaneTransition onComplete={() => navigate('/home')} />}
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md relative z-10 m-4 border-2 border-primary neo-shadow-lg flex flex-col">
                <div className="bg-primary h-32 w-full relative flex items-center justify-center rounded-t-xl overflow-hidden">
                    <span className="material-symbols-outlined text-white text-6xl relative z-10">flight</span>
                </div>
                
                <div className="p-8 pt-6 relative">
                    <h1 className="text-3xl font-black text-center mb-6">Ready for your <br/><span className="text-primary">next adventure?</span></h1>
                    
                    {bannerMessage && (
                        <div className={`p-3 rounded-md mb-6 font-bold text-center border-2 neo-shadow ${bannerType === 'error' ? 'bg-red-100 text-error border-error' : 'bg-green-100 text-green-800 border-green-600'}`}>
                            {bannerMessage}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block font-bold mb-2">Username or Email</label>
                            <input 
                                className={`neo-input w-full p-3 border-2 rounded-md ${emailError ? 'border-error' : 'border-primary'}`} 
                                placeholder="explorer@world.com" 
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={handleEmailBlur}
                            />
                            {emailError && <p className="text-error font-bold text-sm mt-2">{emailError}</p>}
                        </div>
                        <div>
                            <label className="block font-bold mb-2">Password</label>
                            <input 
                                className={`neo-input w-full p-3 border-2 rounded-md ${passwordError ? 'border-error' : 'border-primary'}`} 
                                placeholder="••••••••" 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={handlePasswordBlur}
                            />
                            {passwordError && <p className="text-error font-bold text-sm mt-2">{passwordError}</p>}
                            
                            <div className="flex justify-end mt-2 flex-col items-end">
                                <button type="button" onClick={() => setForgotMsgVisible(true)} className="text-[#004B57] font-bold text-sm hover:underline">Forgot Password?</button>
                                {forgotMsgVisible && <span className="text-xs text-primary font-bold mt-1">Password reset coming soon!</span>}
                            </div>
                        </div>
                        <button 
                            className="w-full bg-primary text-white rounded-md py-4 font-bold text-xl neo-shadow neo-btn transition-all flex justify-center items-center h-16" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Log In"
                            )}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="font-bold">Don't have an account? <Link to="/register" className="text-secondary underline decoration-2">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
