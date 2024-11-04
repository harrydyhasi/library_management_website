import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOGOUT,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from './types';
import { signInUserService, signUpUserService } from '../../services/auth_service'; 

export const signInRequest = () => ({ type: SIGN_IN_REQUEST });
export const signInSuccess = (user) => ({ type: SIGN_IN_SUCCESS, payload: user });
export const signInFailure = (error) => ({ type: SIGN_IN_FAILURE, payload: error });
export const logout = () => ({ type: LOGOUT });
export const signUpRequest = () => ({ type: SIGN_UP_REQUEST });
export const signUpSuccess = (user) => ({ type: SIGN_UP_SUCCESS, payload: user });
export const signUpFailure = (error) => ({ type: SIGN_UP_FAILURE, payload: error });

export const signInUser = (email, password) => {
  return async (dispatch) => {
    dispatch(signInRequest());
    try {
      const response = await signInUserService(email, password);
      dispatch(signInSuccess(response.data.user));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message; 
      dispatch(signInFailure(errorMessage));
    }
  };
};

export const signUpUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(signUpRequest());
    try {
      const response = await signUpUserService({ email, password });
      dispatch(signUpSuccess(response.data.user));
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message; 
      dispatch(signUpFailure(errorMessage));
    }
  };
};


export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};
