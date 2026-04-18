const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },
  
  post: async (endpoint, data) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) localStorage.setItem('token', data.token);
    return data;
  },

  getStats: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  getUsers: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  updateUserStatus: async (id, status) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/admin/users/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  deleteUser: async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  createUser: async (userData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  getSettings: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/admin/settings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  updateSettings: async (settingsData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/admin/settings`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(settingsData)
    });
    return res.json();
  },

  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });
    return res.json();
  },

  createLog: async (logData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(logData)
    });
    return res.json();
  },

  getRecentLogs: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/logs/recent`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  getLearningStats: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/learning/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  completeScenario: async (scenarioId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/learning/complete-scenario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ scenarioId })
    });
    return res.json();
  },

  completeFlashcard: async (flashcardId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/learning/complete-flashcard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ flashcardId })
    });
    return res.json();
  },

  updateQuizScore: async (score) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/learning/quiz-score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ score })
    });
    return res.json();
  },

  getFlashcards: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/flashcards`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  createFlashcard: async (cardData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/flashcards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(cardData)
    });
    return res.json();
  }
};
