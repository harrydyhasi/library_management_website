import http from '../utils/http/http_client';

const signInUserService = async (email, password) => {
    return http.post(`/login/`, { email, password }); 
};

const signUpUserService = async ({ fullName, email, password }) => {
    return http.post(`/register/`, { full_name: fullName, email, password, username: email });
};

export {
    signInUserService,
    signUpUserService,
};
