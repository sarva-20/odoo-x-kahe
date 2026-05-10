import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TopNavBar = ({ activeTab = 'home', hideNav = false }) => {
    const navigate = useNavigate();
    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center px-margin-desktop py-base bg-surface w-full border-b-2 border-on-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-md">
                <Link to="/home" className="font-display-xl text-headline-md text-primary uppercase italic font-bold">Traveloop</Link>
            </div>
            {!hideNav && (
                <div className="hidden md:flex gap-md flex-1 justify-center items-center">
                    <Link to="/home" className={`font-label-bold text-label-bold px-sm py-xs border-b-4 ${activeTab === 'home' ? 'border-primary text-primary' : 'border-transparent text-on-surface hover:bg-surface-variant'}`}>Home</Link>
                    <Link to="/my-trips" className={`font-label-bold text-label-bold px-sm py-xs border-b-4 ${activeTab === 'trips' ? 'border-primary text-primary' : 'border-transparent text-on-surface hover:bg-surface-variant'}`}>My Trips</Link>
                    <Link to="/community" className={`font-label-bold text-label-bold px-sm py-xs border-b-4 ${activeTab === 'community' ? 'border-primary text-primary' : 'border-transparent text-on-surface hover:bg-surface-variant'}`}>Community</Link>
                    <Link to="/profile" className={`font-label-bold text-label-bold px-sm py-xs border-b-4 ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-on-surface hover:bg-surface-variant'}`}>Profile</Link>
                    <Link to="/dashboard" className="text-on-surface font-label-bold hover:bg-surface-variant px-sm py-xs border-2 border-transparent">Admin</Link>
                </div>
            )}
            <div className="flex items-center gap-sm">
                <Link to="/plan-trip" className="bg-primary text-on-primary border-2 border-on-background font-label-bold px-md py-sm neo-shadow neo-btn transition-all flex items-center gap-xs rounded-md">
                    Plan Trip
                </Link>
            </div>
        </nav>
    );
};

export default TopNavBar;
