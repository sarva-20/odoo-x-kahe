import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../config/api.js';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || 'Traveler',
        email: user?.email || '',
        city: 'New York, USA',
        bio: 'Avid explorer of hidden gems and local cuisines. 30 countries and counting!'
    });

    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [pastTrips, setPastTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_BASE_URL}/api/trips/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await res.json();
                if (json.success) {
                    const now = new Date();
                    const upcoming = json.data.filter(t => new Date(t.startDate) >= now);
                    const past = json.data.filter(t => new Date(t.endDate) < now);
                    setUpcomingTrips(upcoming);
                    setPastTrips(past);
                }
            } catch (err) {
                console.error("Failed to fetch trips", err);
            }
        };
        fetchTrips();
    }, []);

    const initials = profileData.name ? profileData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'TR';

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="profile" />
            
            <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full">
                
                {/* Profile Card */}
                <div className="bg-white border-2 border-black neo-shadow-lg p-8 mb-10 relative">
                    {!isEditing ? (
                        <button 
                            className="absolute top-6 right-6 bg-primary text-white px-4 py-2 font-bold border-2 border-black neo-shadow-sm neo-btn flex items-center gap-2"
                            onClick={() => setIsEditing(true)}
                        >
                            <span className="material-symbols-outlined text-sm">edit</span> Edit Profile
                        </button>
                    ) : null}

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="w-[150px] h-[150px] bg-secondary rounded-full flex-shrink-0 flex items-center justify-center border-4 border-black neo-shadow text-white text-5xl font-black relative overflow-hidden group">
                            {initials}
                            {isEditing && (
                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center cursor-pointer transition-opacity opacity-0 group-hover:opacity-100">
                                    <span className="material-symbols-outlined text-white">photo_camera</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-grow w-full">
                            {isEditing ? (
                                <div className="space-y-4 max-w-lg">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Name</label>
                                        <input className="neo-input w-full p-2 border-2 border-black focus:border-primary text-lg font-bold" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Email</label>
                                        <input className="neo-input w-full p-2 border-2 border-black focus:border-primary text-lg font-bold" value={profileData.email} disabled />
                                        <span className="text-xs text-gray-400">Email cannot be changed</span>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Location</label>
                                        <input className="neo-input w-full p-2 border-2 border-black focus:border-primary text-lg font-bold" value={profileData.city} onChange={e => setProfileData({...profileData, city: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Bio</label>
                                        <textarea className="neo-input w-full p-2 border-2 border-black focus:border-primary text-lg font-bold resize-none h-24" value={profileData.bio} onChange={e => setProfileData({...profileData, bio: e.target.value})} />
                                    </div>
                                    <div className="flex gap-4 pt-2">
                                        <button className="flex-1 py-3 bg-white border-2 border-black font-bold neo-shadow-sm neo-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                                        <button className="flex-1 py-3 bg-primary text-white border-2 border-black font-bold neo-shadow-sm neo-btn" onClick={() => setIsEditing(false)}>Save Changes</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="text-4xl font-headline font-black mb-1">{profileData.name}</h1>
                                    <p className="text-gray-500 font-bold mb-3 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">alternate_email</span> {profileData.email}
                                    </p>
                                    <p className="text-primary font-bold mb-4 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-sm">location_on</span> {profileData.city}
                                    </p>
                                    <p className="text-lg font-bold max-w-2xl leading-relaxed">
                                        "{profileData.bio}"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Trips Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Preplanned / Upcoming */}
                    <div>
                        <h2 className="text-2xl font-headline font-black mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">flight_takeoff</span> Upcoming Trips
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {upcomingTrips.length > 0 ? upcomingTrips.map(trip => (
                                <div key={trip.id} className="bg-white border-2 border-black neo-shadow flex flex-col h-full relative overflow-hidden group">
                                    <div className="h-16 bg-amber-100 border-b-2 border-black"></div>
                                    <div className="p-4 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-headline font-black text-xl mb-1 truncate">{trip.name}</h3>
                                            <p className="text-xs font-bold text-gray-500 mb-4">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                                        </div>
                                        <button 
                                            className="w-full py-2 bg-secondary text-white font-bold border-2 border-black neo-shadow-sm neo-btn"
                                            onClick={() => navigate('/itinerary-view', { state: { tripId: trip.id } })}
                                        >
                                            View Itinerary
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full bg-white border-2 border-dashed border-gray-300 p-6 text-center font-bold text-gray-400">
                                    No upcoming trips. <span className="text-primary cursor-pointer underline" onClick={() => navigate('/plan-trip')}>Plan one now!</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Previous / Completed */}
                    <div>
                        <h2 className="text-2xl font-headline font-black mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary">flight_land</span> Previous Trips
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {pastTrips.length > 0 ? pastTrips.map(trip => (
                                <div key={trip.id} className="bg-white border-2 border-black neo-shadow flex flex-col h-full relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="h-16 bg-gray-200 border-b-2 border-black"></div>
                                    <div className="p-4 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-headline font-black text-xl mb-1 truncate">{trip.name}</h3>
                                            <p className="text-xs font-bold text-gray-500 mb-4">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                                        </div>
                                        <button 
                                            className="w-full py-2 bg-white text-secondary font-bold border-2 border-black neo-shadow-sm neo-btn"
                                            onClick={() => navigate('/itinerary-view', { state: { tripId: trip.id } })}
                                        >
                                            Review Trip
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full bg-white border-2 border-dashed border-gray-300 p-6 text-center font-bold text-gray-400">
                                    No past trips found.
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </main>
            <Footer />
        </div>
    );
};

export default Profile;
