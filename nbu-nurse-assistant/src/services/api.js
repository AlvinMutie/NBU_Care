const API_BASE_URL = 'http://localhost:5000/api';

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
  }
};
