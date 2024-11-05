import {
  FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
  FETCH_ALL_USERS_REQUEST, FETCH_ALL_USERS_SUCCESS,FETCH_ALL_USERS_FAILURE,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from './types';
import {
  fetchUserById,
  fetchAllUsers as fetchAllUsersService,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,

 } from '../../services/user_service';

// Existing actions
export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
export const fetchUserSuccess = (user) => ({ type: FETCH_USER_SUCCESS, payload: user });
export const fetchUserFailure = (error) => ({ type: FETCH_USER_FAILURE, payload: error });

export const fetchUser = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const response = await fetchUserById(userId);
      dispatch(fetchUserSuccess(response.data));
    } catch (error) {
      dispatch(fetchUserFailure(error.message));
    }
  };
};

// New actions for fetching all users
export const fetchAllUsersRequest = () => ({ type: FETCH_ALL_USERS_REQUEST });
export const fetchAllUsersSuccess = (users) => ({ type: FETCH_ALL_USERS_SUCCESS, payload: users });
export const fetchAllUsersFailure = (error) => ({ type: FETCH_ALL_USERS_FAILURE, payload: error });

// Thunk function to fetch all users
export const fetchAllUsers = () => {
  return async (dispatch) => {
    dispatch(fetchAllUsersRequest());
    try {
      const response = await fetchAllUsersService();
      dispatch(fetchAllUsersSuccess(response.data)); // Dispatch success with all users data
    } catch (error) {
      dispatch(fetchAllUsersFailure(error.message)); // Dispatch failure with error
    }
  };
};

export const createUserRequest = () => ({ type: CREATE_USER_REQUEST });
export const createUserSuccess = (user) => ({ type: CREATE_USER_SUCCESS, payload: user });
export const createUserFailure = (error) => ({ type: CREATE_USER_FAILURE, payload: error });

export const createUser = ({ email, password, phone, role, fullName }) => {
  return async (dispatch) => {
    dispatch(createUserRequest());
    try {
      const response = await createUserService({ email, password, phone, role, fullName });
      dispatch(createUserSuccess(response.data.user));
      dispatch(fetchAllUsers());
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message; 
      dispatch(createUserFailure(errorMessage));
    }
  };
};

export const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
export const updateUserSuccess = (user) => ({ type: UPDATE_USER_SUCCESS, payload: user });
export const updateUserFailure = (error) => ({ type: UPDATE_USER_FAILURE, payload: error });

export const updateUser = (userId, userData) => {
  return async (dispatch) => {
    dispatch(updateUserRequest());
    try {
      const response = await updateUserService(userId, userData);
      dispatch(updateUserSuccess(response.data));
      dispatch(fetchAllUsers());
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
};

// New actions for deleting a user
export const deleteUserRequest = () => ({ type: DELETE_USER_REQUEST });
export const deleteUserSuccess = (userId) => ({ type: DELETE_USER_SUCCESS, payload: userId });
export const deleteUserFailure = (error) => ({ type: DELETE_USER_FAILURE, payload: error });

export const deleteUser = (userId) => {
  return async (dispatch) => {
    dispatch(deleteUserRequest());
    try {
      await deleteUserService(userId);
      dispatch(deleteUserSuccess(userId));
      // Optionally fetch all users again if needed
      dispatch(fetchAllUsers());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
};
