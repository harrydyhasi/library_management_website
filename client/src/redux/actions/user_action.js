// src/redux/actions/userActions.js
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from './types';
import { fetchUserById } from '../../services/user_service'; // Import the fetchUserProfile function

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const fetchUser = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const response = await fetchUserById(userId); // Call the service function
      dispatch(fetchUserSuccess(response.data)); // Dispatch success with user data
    } catch (error) {
      dispatch(fetchUserFailure(error.message)); // Dispatch failure with error
    }
  };
};
