// src/redux/actions/authActions.js
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOGOUT,
} from '../actions/types';
import { signInUserService } from '../../services/auth'; // Import your authentication service

export const signInRequest = () => ({
  type: SIGN_IN_REQUEST,
});

export const signInSuccess = (user) => ({
  type: SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,  // No payload needed for logout action, so it's just a type property.  The payload is managed in the reducer.  In this case, we just want to clear the user information.  You might want to add more information to the payload if needed.  For example, you might want to clear the token or other sensitive information.  The payload should be a simple object with any necessary data.  The reducer would then handle the actual clearing of that data.  In this case, we're just clearing the user information.  If you want to clear more data, you would need to update the reducer to handle the LOGOUT action.  This is a very basic example and may not cover all your specific requirements.  You would likely want to handle errors more gracefully, add additional functionality, and consider how you want to handle sensitive data.  Also, you might want to consider using a more robust authentication library like redux-thunk or redux-
});

export const signInUser = (email, password) => {
  return async (dispatch) => {
    dispatch(signInRequest());
    try {
      const response = await signInUserService(email, password); 
      console.log("Sign In Response: ", response.data); // Log the response

      dispatch(signInSuccess(response.data.user)); 
    } catch (error) {
            console.error("Sign In Error: ", error); // Log the error

      dispatch(signInFailure(error.message)); 
      
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};