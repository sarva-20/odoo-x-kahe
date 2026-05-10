import API_BASE_URL from '../config/api.js';

const getToken = () => localStorage.getItem('token');

<<<<<<< HEAD
export const getTrips = async () => {
  const res = await fetch(`${API_BASE_URL}/api/trips`, {
    credentials: 'include',
    headers: { Authorization: `Bearer ${getToken()}` }
=======
const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${getToken()}`,
    },
>>>>>>> 883c258 (Integration)
  });

  return response.json();
};

export const getTrips = async () => {
  return request('/api/trips');
};

export const createTrip = async (data) => {
  return request('/api/trips', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
};

<<<<<<< HEAD
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
=======
export const getTripById = async (id) => request(`/api/trips/${id}`);

export const deleteTrip = async (id) => request(`/api/trips/${id}`, { method: 'DELETE' });
>>>>>>> 883c258 (Integration)


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
