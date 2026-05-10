import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import DoodleBackground from '../components/DoodleBackground';
import Footer from '../components/Footer';

export default function MyTrips() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [groupBy, setGroupBy] = useState('status');
    const [filterType, setFilterType] = useState('all');
    const [sortBy, setSortBy] = useState('recent');

    // ============================================================
    // MOCK DATA - Replace with API call later
    // ============================================================
    const mockTrips = {
        ongoing: [
            {
                id: 1,
                name: 'European Summer Backpacking',
                destinations: ['Paris', 'Rome', 'Barcelona'],
                startDate: 'Jul 15, 2024',
                endDate: 'Aug 30, 2024',
                totalDays: 45,
                elapsedDays: 20,
                color: '#FF4500',
                status: 'ongoing',
            },
        ],
        upcoming: [
            {
                id: 2,
                name: 'Bali Retreat',
                destinations: ['Ubud', 'Canggu'],
                startDate: 'Dec 20, 2024',
                endDate: 'Jan 05, 2025',
                totalDays: 16,
                elapsedDays: 0,
                color: '#004B57',
                status: 'upcoming',
            },
            {
                id: 3,
                name: 'Swiss Alps Hike',
                destinations: ['Zurich', 'Interlaken'],
                startDate: 'Mar 10, 2025',
                endDate: 'Mar 20, 2025',
                totalDays: 10,
                elapsedDays: 0,
                color: '#FF4500',
                status: 'upcoming',
            },
        ],
        completed: [
            {
                id: 4,
                name: 'Tokyo Drift',
                destinations: ['Tokyo', 'Kyoto'],
                startDate: 'Apr 10, 2023',
                endDate: 'Apr 25, 2023',
                totalDays: 15,
                elapsedDays: 15,
                color: '#004B57',
                status: 'completed',
            },
            {
                id: 5,
                name: 'NYC Weekend',
                destinations: ['New York'],
                startDate: 'Dec 20, 2022',
                endDate: 'Dec 24, 2022',
                totalDays: 4,
                elapsedDays: 4,
                color: '#FF4500',
                status: 'completed',
            },
        ],
    };

    // ============================================================
    // FILTER & SEARCH LOGIC
    // ============================================================
    const filterTrips = (trips) => {
        return trips.filter((trip) => {
            const matchesSearch =
                trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                trip.destinations.some((dest) =>
                    dest.toLowerCase().includes(searchQuery.toLowerCase())
                );
            return matchesSearch;
        });
    };

    const ongoingTrips = filterTrips(mockTrips.ongoing);
    const upcomingTrips = filterTrips(mockTrips.upcoming);
    const completedTrips = filterTrips(mockTrips.completed);

    // ============================================================
    // SVG ICONS
    // ============================================================
    const MapPinIcon = () => (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF4500"
            strokeWidth="2"
        >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
            <circle cx="12" cy="10" r="3" fill="#FF4500" />
        </svg>
    );

    const CalendarIcon = () => (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            strokeWidth="2"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );

    const SuitcaseIcon = () => (
        <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="2"
        >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
    );

    const MagnifierIcon = () => (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            strokeWidth="2"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
        </svg>
    );

    // ============================================================
    // TRIP CARD COMPONENT
    // ============================================================
    const TripCard = ({ trip, statusColor, accentBorder }) => {
        const progressPercentage = Math.round(
            (trip.elapsedDays / trip.totalDays) * 100
        );

        return (
            <div
                className="w-full p-6 mb-4 bg-white border-2 border-black transition-all duration-200 hover:shadow-none hover:translate-y-[-2px] cursor-pointer"
                style={{
                    boxShadow: '8px 8px 0px 0px #000000',
                    borderLeft: `8px solid ${accentBorder}`,
                    fontFamily: 'Be Vietnam Pro',
                }}
                onClick={() => navigate('/itinerary-view')}
            >
                <div className="flex gap-6">
                    {/* Thumbnail */}
                    <div
                        className="flex-shrink-0 w-[150px] h-[120px] rounded-lg flex items-center justify-center"
                        style={{
                            backgroundColor: trip.color,
                        }}
                    >
                        <div className="text-white text-4xl">✈️</div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <h3
                            className="text-2xl font-bold mb-2 text-black"
                            style={{ fontFamily: 'Plus Jakarta Sans' }}
                        >
                            {trip.name}
                        </h3>

                        {/* Destinations */}
                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-700">
                            <MapPinIcon />
                            <span>{trip.destinations.join(' • ')}</span>
                        </div>

                        {/* Date Range */}
                        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                            <CalendarIcon />
                            <span>
                                {trip.startDate} to {trip.endDate}
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-semibold text-gray-600">
                                    Progress
                                </span>
                                <span
                                    className="text-xs font-bold"
                                    style={{ color: accentBorder }}
                                >
                                    {progressPercentage}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                    className="h-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%`, backgroundColor: accentBorder }}
                                />
                            </div>
                            <span className="text-xs text-gray-500 mt-1">
                                {trip.elapsedDays} of {trip.totalDays} days
                            </span>
                        </div>
                    </div>

                    {/* Right Side - Actions & Status */}
                    <div className="flex-shrink-0 flex flex-col justify-between items-end">
                        {/* Status Badge */}
                        <div
                            className="px-4 py-2 rounded-full text-white text-xs font-bold text-center min-w-[90px]"
                            style={{
                                backgroundColor: statusColor,
                                border: '2px solid black',
                            }}
                        >
                            {trip.status === 'ongoing'
                                ? 'Ongoing'
                                : trip.status === 'upcoming'
                                ? 'Upcoming'
                                : 'Completed'}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-2 mt-4">
                            {/* View Trip Button */}
                            <button
                                className="px-6 py-2 bg-[#FF4500] text-white font-bold border-2 border-black transition-all duration-200"
                                style={{
                                    boxShadow: '4px 4px 0px 0px #000000',
                                    fontFamily: 'Plus Jakarta Sans',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translate(2px, 2px)';
                                    e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translate(0, 0)';
                                    e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000000';
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate('/itinerary-view');
                                }}
                            >
                                View Trip
                            </button>

                            {/* Edit/View Plans Button */}
                            {trip.status !== 'completed' && (
                                <button
                                    className="px-6 py-2 bg-white text-[#004B57] font-bold border-2 border-[#004B57] transition-all duration-200"
                                    style={{
                                        boxShadow: '4px 4px 0px 0px #004B57',
                                        fontFamily: 'Plus Jakarta Sans',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translate(2px, 2px)';
                                        e.currentTarget.style.boxShadow = '2px 2px 0px 0px #004B57';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translate(0, 0)';
                                        e.currentTarget.style.boxShadow = '4px 4px 0px 0px #004B57';
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/builder');
                                    }}
                                >
                                    {trip.status === 'upcoming' ? 'Edit Plans' : 'Edit'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // ============================================================
    // EMPTY STATE COMPONENT
    // ============================================================
    const EmptyState = ({ title, showButton }) => (
        <div className="flex flex-col items-center justify-center py-12 px-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="mb-4">
                <SuitcaseIcon />
            </div>
            <p
                className="text-lg font-semibold text-gray-600 mb-4"
                style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
                {title}
            </p>
            {showButton && (
                <button
                    className="px-6 py-3 bg-[#FF4500] text-white font-bold border-2 border-black transition-all duration-200"
                    style={{
                        boxShadow: '4px 4px 0px 0px #000000',
                        fontFamily: 'Plus Jakarta Sans',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate(2px, 2px)';
                        e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000000';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000000';
                    }}
                    onClick={() => navigate('/plan-trip')}
                >
                    + Plan your first trip
                </button>
            )}
        </div>
    );

    // ============================================================
    // SECTION COMPONENT
    // ============================================================
    const TripsSection = ({ title, trips, statusColor, accentBorder, showEmpty }) => (
        <div className="mb-12">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-6">
                <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: statusColor }}
                />
                <h2
                    className="text-3xl font-bold text-black"
                    style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800 }}
                >
                    {title}
                </h2>
            </div>

            {/* Trip Cards or Empty State */}
            {trips.length > 0 ? (
                <div>{trips.map((trip) => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        statusColor={statusColor}
                        accentBorder={accentBorder}
                    />
                ))}</div>
            ) : showEmpty ? (
                <EmptyState
                    title={`No ${title.toLowerCase()} trips yet`}
                    showButton={title === 'Ongoing'}
                />
            ) : null}
        </div>
    );

    // ============================================================
    // MAIN RENDER
    // ============================================================
    return (
        <div className="min-h-screen bg-white relative overflow-hidden" style={{ fontFamily: 'Be Vietnam Pro' }}>
            {/* Background Doodles */}
            <DoodleBackground />

            {/* Navigation */}
            <TopNavBar activeTab="trips" />

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                {/* Page Title & New Trip Button */}
                <div className="flex justify-between items-center mb-12">
                    <h1
                        className="text-7xl font-black text-black"
                        style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800 }}
                    >
                        My Trips
                    </h1>
                    <button
                        className="px-8 py-4 bg-[#FF4500] text-white font-bold border-2 border-black text-lg transition-all duration-200"
                        style={{
                            boxShadow: '4px 4px 0px 0px #000000',
                            fontFamily: 'Plus Jakarta Sans',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translate(2px, 2px)';
                            e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000000';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translate(0, 0)';
                            e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000000';
                        }}
                        onClick={() => navigate('/plan-trip')}
                    >
                        + New Trip
                    </button>
                </div>

                {/* Search & Filter Row */}
                <div className="flex gap-4 mb-12">
                    {/* Search Bar */}
                    <div className="flex-grow relative">
                        <div
                            className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-black"
                            style={{ boxShadow: '4px 4px 0px 0px #000000' }}
                        >
                            <MagnifierIcon />
                            <input
                                type="text"
                                placeholder="Search your trips..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-grow outline-none text-gray-700"
                                style={{ fontFamily: 'Be Vietnam Pro' }}
                            />
                        </div>
                    </div>

                    {/* Group By Dropdown */}
                    <select
                        value={groupBy}
                        onChange={(e) => setGroupBy(e.target.value)}
                        className="px-4 py-3 bg-white border-2 border-black font-semibold text-gray-700 cursor-pointer"
                        style={{
                            boxShadow: '4px 4px 0px 0px #000000',
                            fontFamily: 'Plus Jakarta Sans',
                        }}
                    >
                        <option value="status">Group by Status</option>
                        <option value="date">Group by Date</option>
                        <option value="destination">Group by Destination</option>
                    </select>

                    {/* Filter Pill */}
                    <button
                        className="px-4 py-3 bg-white border-2 border-black font-semibold text-gray-700 transition-all duration-200"
                        style={{
                            boxShadow: '4px 4px 0px 0px #000000',
                            fontFamily: 'Plus Jakarta Sans',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translate(2px, 2px)';
                            e.currentTarget.style.boxShadow = '2px 2px 0px 0px #000000';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translate(0, 0)';
                            e.currentTarget.style.boxShadow = '4px 4px 0px 0px #000000';
                        }}
                        onClick={() => setFilterType(filterType === 'all' ? 'recent' : 'all')}
                    >
                        🔍 Filter
                    </button>

                    {/* Sort By Dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 bg-white border-2 border-black font-semibold text-gray-700 cursor-pointer"
                        style={{
                            boxShadow: '4px 4px 0px 0px #000000',
                            fontFamily: 'Plus Jakarta Sans',
                        }}
                    >
                        <option value="recent">Sort by Recent</option>
                        <option value="oldest">Sort by Oldest</option>
                        <option value="duration">Sort by Duration</option>
                    </select>
                </div>

                {/* Three Sections */}
                <TripsSection
                    title="Ongoing"
                    trips={ongoingTrips}
                    statusColor="#FF4500"
                    accentBorder="#FF4500"
                    showEmpty={true}
                />

                <TripsSection
                    title="Upcoming"
                    trips={upcomingTrips}
                    statusColor="#FFB347"
                    accentBorder="#FFB347"
                    showEmpty={true}
                />

                <TripsSection
                    title="Completed"
                    trips={completedTrips}
                    statusColor="#9CA3AF"
                    accentBorder="#9CA3AF"
                    showEmpty={true}
                />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
