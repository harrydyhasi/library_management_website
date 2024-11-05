// user_service.js
import api from '../utils/http/http_client';

export const fetchUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

export const fetchAllUsers = () => { 
  return api.get('/users');
}

export const createUser = (user) => {
  return api.post('/users', user); 
}

export const updateUser = (userId, userData) => {
  return api.put(`/users/${userId}`, userData); 
}

export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`); 
}
