import React from 'react';
import { Link } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

import DoodleBackground from '../components/DoodleBackground';

const Dashboard = () => {
    return (
        <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar hideNav={true} />
            <main className="max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-black">Admin Dashboard</h1>
                    <Link to="/home" className="font-bold underline">Back to App</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white border-2 border-black border-l-8 border-l-primary rounded-md neo-shadow p-6">
                        <p className="font-bold text-on-surface-variant">Total Users</p>
                        <h3 className="text-3xl font-black">12,450</h3>
                    </div>
                    <div className="bg-white border-2 border-black border-l-8 border-l-secondary rounded-md neo-shadow p-6">
                        <p className="font-bold text-on-surface-variant">Active Trips</p>
                        <h3 className="text-3xl font-black">3,892</h3>
                    </div>
                </div>
                <div className="bg-white border-2 border-black rounded-md neo-shadow p-6">
                    <h3 className="text-2xl font-bold mb-4">Recent Users</h3>
                    <table className="w-full text-left font-bold">
                        <thead>
                            <tr className="border-b-2 border-black">
                                <th className="py-2">Name</th>
                                <th className="py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-300">
                                <td className="py-2">Alex Johnson</td>
                                <td className="py-2"><span className="bg-secondary-container text-secondary px-2 py-1 rounded border border-black text-xs">Active</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
