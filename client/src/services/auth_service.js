import http from '../utils/http/http_client';

const signInUserService = async (email, password) => {
    return http.post(`/login/`, { email, password }); 
};

const signUpUserService = async ({ email, password }) => {
    return http.post(`/register/`, { email, password});
};

export {
    signInUserService,
    signUpUserService,
};
