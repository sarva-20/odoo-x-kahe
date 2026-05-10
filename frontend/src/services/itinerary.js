import API_BASE_URL from '../config/api.js';

const getToken = () => localStorage.getItem('token');

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

export const getItinerary = async (tripId) => request(`/api/trips/${tripId}/full`);

export const addStop = async (tripId, stopData) => request(`/api/trips/${tripId}/stops`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(stopData),
});

export const addActivity = async (stopId, activityData) => request(`/api/stops/${stopId}/activities`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(activityData),
});