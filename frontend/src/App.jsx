import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MyTrips from './pages/MyTrips';
import PlanTrip from './pages/PlanTrip';
import ItineraryBuilder from './pages/ItineraryBuilder';
import ItineraryView from './pages/ItineraryView';
import Checklist from './pages/Checklist';
import Notes from './pages/Notes';
import Invoice from './pages/Invoice';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/builder" element={<ItineraryBuilder />} />
        <Route path="/itinerary-view" element={<ItineraryView />} />
        <Route path="/checklist" element={<Checklist />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
