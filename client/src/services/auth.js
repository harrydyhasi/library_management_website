import api from '../utils/http/http_client';

export const signInUserService = async (email, password) => {
    return api.post(`/login/`, { email, password }); 
};
