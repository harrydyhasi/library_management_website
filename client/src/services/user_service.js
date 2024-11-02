// user_service.js
import api from '../utils/http/http_client';

export const fetchUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

export const fetchAllUsers = () => { 
  return api.get('/users');
}

export const createUser = (user) => {
  return api.post('/users', user); // Assuming you're using POST for creation
}

export const updateUser = (userId, userData) => {
  return api.put(`/users/${userId}`, userData); // Assuming you're using PUT for updates
}

export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`); // Assuming you're using DELETE for removal
}
