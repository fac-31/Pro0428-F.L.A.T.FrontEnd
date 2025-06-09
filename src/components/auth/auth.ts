import api from '../../api/axios.ts';

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const logout = async () => {
  try {
    // Call the logout endpoint
    await api.post('/logout');

    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('house_id');

    // Clear any auth headers from axios
    delete api.defaults.headers.common['Authorization'];

    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear local storage even if the server call fails
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('house_id');
    delete api.defaults.headers.common['Authorization'];
    return false;
  }
};
