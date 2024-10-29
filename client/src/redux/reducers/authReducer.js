// src/redux/reducers/authReducer.js
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOGOUT,
} from '../actions/types';

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { ...state, loading: true, error: null };
    case SIGN_IN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case SIGN_IN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, user: null }; 
    default:
      return state;
  }
};

export default authReducer;
