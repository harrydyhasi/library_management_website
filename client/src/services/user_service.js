import api from '../utils/http/http_client';

export const fetchUserById = (userId) => {
  return api.get(`/users/${userId}`);
};

