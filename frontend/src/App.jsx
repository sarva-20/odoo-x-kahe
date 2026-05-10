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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
      <Route path="/my-trips" element={<ProtectedRoute><MyTrips /></ProtectedRoute>} />
      <Route path="/plan-trip" element={<ProtectedRoute><PlanTrip /></ProtectedRoute>} />
      <Route path="/builder" element={<ProtectedRoute><ItineraryBuilder /></ProtectedRoute>} />
      <Route path="/itinerary-view" element={<ProtectedRoute><ItineraryView /></ProtectedRoute>} />
      <Route path="/checklist" element={<ProtectedRoute><Checklist /></ProtectedRoute>} />
      <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
      <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
      <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
