import API_BASE_URL from '../config/api.js';

const getToken = () => localStorage.getItem('token');

export const getTrips = async () => {
  const res = await fetch(`${API_BASE_URL}/api/trips`, {
    credentials: 'include',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
};

export const createTrip = async (data) => {
  const res = await fetch(`${API_BASE_URL}/api/trips`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const createStop = async (tripId, data) => {
  const res = await fetch(`${API_BASE_URL}/api/trips/${tripId}/stops`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};


export const getTripBudget = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/trips/${id}/budget`, {
    credentials: 'include',
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
};

export const addChecklist = async (id, item) => {
  const res = await fetch(`${API_BASE_URL}/api/trips/${id}/checklist`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(item)
  });
  return res.json();
};
