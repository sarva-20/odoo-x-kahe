import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Users');

    const tabs = [
        { id: 'Users', label: 'Manage Users' },
        { id: 'Cities', label: 'Popular Cities' },
        { id: 'Activities', label: 'Popular Activities' },
        { id: 'Trends', label: 'User Trends & Analytics' }
    ];

    const stats = [
        { title: 'Total Users', value: '12,450', change: '+15%', color: 'border-l-primary' },
        { title: 'Active Trips', value: '3,842', change: '+8%', color: 'border-l-secondary' },
        { title: 'Cities Explored', value: '840', change: '+22%', color: 'border-l-[#FFB347]' },
        { title: 'Avg Trip Budget', value: '$2,450', change: '-3%', color: 'border-l-gray-500' }
    ];

    const tripsPerMonth = [
        { name: 'Jan', trips: 400 },
        { name: 'Feb', trips: 300 },
        { name: 'Mar', trips: 550 },
        { name: 'Apr', trips: 800 },
        { name: 'May', trips: 1200 },
        { name: 'Jun', trips: 1500 },
        { name: 'Jul', trips: 1800 }
    ];

    const popularCities = [
        { name: 'Paris', value: 400, color: '#FF4500' },
        { name: 'Tokyo', value: 300, color: '#004B57' },
        { name: 'Rome', value: 300, color: '#FFB347' },
        { name: 'New York', value: 200, color: '#808080' }
    ];

    const userGrowth = [
        { name: 'Jan', users: 1000 },
        { name: 'Feb', users: 2500 },
        { name: 'Mar', users: 4000 },
        { name: 'Apr', users: 6500 },
        { name: 'May', users: 9000 },
        { name: 'Jun', users: 12450 }
    ];

    const mockUsers = [
        { id: 1, name: 'Alice Smith', email: 'alice@example.com', trips: 4, status: 'Active' },
        { id: 2, name: 'Bob Jones', email: 'bob@example.com', trips: 12, status: 'Pro' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', trips: 0, status: 'Inactive' },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', trips: 2, status: 'Active' }
    ];

    const getStatusStyle = (status) => {
        if (status === 'Active') return 'bg-teal-100 text-teal-800 border-secondary';
        if (status === 'Pro') return 'bg-red-100 text-primary border-primary';
        return 'bg-gray-100 text-gray-800 border-gray-400';
    };

    return (
        <div className="doodle-bg min-h-screen flex flex-col relative overflow-hidden">
            <DoodleBackground />
            <TopNavBar activeTab="dashboard" />
            
            <main className="relative z-10 max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full">
                <div className="mb-8">
                    <h1 className="text-4xl font-headline font-black mb-6">Admin Dashboard</h1>
                    <div className="flex flex-wrap gap-4">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`px-6 py-3 font-bold border-2 border-black transition-all ${activeTab === tab.id ? 'bg-primary text-white neo-shadow-sm' : 'bg-white text-black hover:bg-surface'}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((s, i) => (
                        <div key={i} className={`bg-white border-2 border-black border-l-8 ${s.color} p-6 neo-shadow`}>
                            <h3 className="font-bold text-gray-500 mb-2">{s.title}</h3>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-black">{s.value}</span>
                                <span className={`px-2 py-1 text-xs font-bold border-2 border-black ${s.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {s.change}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <div className="bg-white border-2 border-black p-6 neo-shadow">
                            <h2 className="text-xl font-headline font-black mb-6">Trips per Month</h2>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={tripsPerMonth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontWeight: 'bold'}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fontWeight: 'bold'}} />
                                        <RechartsTooltip cursor={{fill: '#fff8f6'}} contentStyle={{border: '2px solid black', fontWeight: 'bold', boxShadow: '4px 4px 0px 0px #000'}} />
                                        <Bar dataKey="trips" fill="#FF4500" stroke="#000" strokeWidth={2} radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-black p-6 neo-shadow overflow-x-auto">
                            <h2 className="text-xl font-headline font-black mb-4">Recent Users</h2>
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-surface border-b-2 border-black">
                                        <th className="p-3 font-black uppercase text-sm">Name</th>
                                        <th className="p-3 font-black uppercase text-sm">Email</th>
                                        <th className="p-3 font-black uppercase text-sm text-center">Trips</th>
                                        <th className="p-3 font-black uppercase text-sm text-center">Status</th>
                                        <th className="p-3 font-black uppercase text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockUsers.map(u => (
                                        <tr key={u.id} className="border-b-2 border-gray-200 hover:bg-gray-50">
                                            <td className="p-3 font-bold">{u.name}</td>
                                            <td className="p-3 font-bold text-gray-500">{u.email}</td>
                                            <td className="p-3 font-black text-center">{u.trips}</td>
                                            <td className="p-3 text-center">
                                                <span className={`px-3 py-1 font-black text-xs border-2 ${getStatusStyle(u.status)}`}>
                                                    {u.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-right">
                                                <button className="px-3 py-1 bg-white border-2 border-black font-bold text-sm neo-shadow-sm hover:bg-surface">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-white border-2 border-black p-6 neo-shadow">
                            <h2 className="text-xl font-headline font-black mb-6">Popular Cities</h2>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={popularCities}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {popularCities.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip formatter={(value) => `${value} trips`} contentStyle={{border: '2px solid black', fontWeight: 'bold', boxShadow: '4px 4px 0px 0px #000'}} />
                                        <Legend wrapperStyle={{fontWeight: 'bold'}} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-black p-6 neo-shadow flex-grow">
                            <h2 className="text-xl font-headline font-black mb-6">User Growth</h2>
                            <div className="h-48 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={userGrowth} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontWeight: 'bold', fontSize: 12}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fontWeight: 'bold', fontSize: 12}} width={40} />
                                        <RechartsTooltip contentStyle={{border: '2px solid black', fontWeight: 'bold', boxShadow: '4px 4px 0px 0px #000'}} />
                                        <Line type="monotone" dataKey="users" stroke="#004B57" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#FF4500', stroke: '#000'}} activeDot={{r: 6}} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
