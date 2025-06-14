import axios from 'axios';

const pythonApi = axios.create({
  baseURL: import.meta.env.VITE_PYTHON_API_URL,
  withCredentials: true,
});

export default pythonApi; 