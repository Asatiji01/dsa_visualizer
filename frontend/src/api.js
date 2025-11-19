import axios from 'axios';

const API = axios.create({ baseURL: 'https://dsa-visualizer-backend-iemk.onrender.com/api' });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers['x-auth-token'] = token;
  return config;
});

export default API;

