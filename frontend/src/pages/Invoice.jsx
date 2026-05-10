import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import DoodleBackground from '../components/DoodleBackground';

const Invoice = () => {
    const navigate = useNavigate();
    return (
        <div className="doodle-bg min-h-screen flex flex-col">
            <DoodleBackground />
            <TopNavBar activeTab="trips" />
            <main className="max-w-[1000px] mx-auto px-4 py-8 flex-grow w-full">
                <h1 className="text-4xl font-black mb-8">Invoice & Billing</h1>
                <div className="bg-white border-2 border-black rounded-md neo-shadow p-6 mb-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Trip to Europe</h2>
                            <p className="text-on-surface-variant font-bold">INV-xyz-30290</p>
                        </div>
                        <span className="bg-[#ffbf00] font-bold px-3 py-1 border-2 border-black rounded-md">Pending</span>
                    </div>
                    <div className="border-t-2 border-black pt-4">
                        <div className="flex justify-between font-bold text-xl mb-2"><span>Total</span><span className="text-primary">$22,000</span></div>
                        <button className="w-full bg-primary text-white font-bold py-3 mt-4 rounded-md border-2 border-black neo-shadow neo-btn">Mark as Paid</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Invoice;
