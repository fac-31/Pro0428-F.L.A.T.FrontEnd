import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // we can still use this method - but make sure https is specificed when we deploy
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
