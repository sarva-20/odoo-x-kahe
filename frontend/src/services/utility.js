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

export const getTripBudget = async (tripId) => request(`/api/trips/${tripId}/budget`);

export const getTripRecommendations = async (tripId) => request(`/api/trips/${tripId}/recommendations`);

export const addChecklistItem = async (tripId, itemData) => request(`/api/trips/${tripId}/checklist`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(itemData),
});

export const toggleChecklistItem = async (itemId) => request(`/api/checklist/${itemId}/toggle`, {
  method: 'PATCH',
});