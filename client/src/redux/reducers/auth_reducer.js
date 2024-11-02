import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGOUT,
} from '../actions/types';

const initialState = {
  loading: false,
  new_user: null,
  user: null,
  signup_error: null,
  signin_error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { ...state, loading: true, signin_error: null };
    case SIGN_IN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case SIGN_IN_FAILURE:
      return { ...state, loading: false, signin_error: action.payload };

    case SIGN_UP_REQUEST:
      return { ...state, loading: true, signup_error: null }; 
    case SIGN_UP_SUCCESS:
      return { ...state, loading: false, new_user: action.payload  }; 
    case SIGN_UP_FAILURE:
      return { ...state, loading: false, signup_error: action.payload }; 
    case LOGOUT:
      return { ...state, loading: false, user: null, signup_error: null, new_user: null }; 
    default:
      return state;
  }
};

export default authReducer;
