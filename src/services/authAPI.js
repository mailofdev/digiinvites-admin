import axios from './axiosInstance';

export const loginAPI = (data) => axios.post('/auth/login', data);
export const registerAPI = (data) => axios.post('/auth/register', data);
export const getProfileAPI = () => axios.get('/auth/profile');

export const registerUserAPI = async (userData) => {
  const response = await axios.post('/auth/signup', userData);
  return response.data;
};
