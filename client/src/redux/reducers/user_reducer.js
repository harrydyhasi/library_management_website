// reducer.js
import { 
  FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
  FETCH_ALL_USERS_REQUEST, FETCH_ALL_USERS_SUCCESS, FETCH_ALL_USERS_FAILURE,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE,
  CLEAR_ERROR
} from '../actions/types';

const initialState = {
  loading: false,
  user: {},
  allUsers: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
    case FETCH_ALL_USERS_REQUEST:
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case FETCH_ALL_USERS_SUCCESS:
      return { ...state, loading: false, allUsers: action.payload, error: null };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, new_user: action.payload, error: null }; 
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, error: null }; 
    case DELETE_USER_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        allUsers: state.allUsers.filter(user => user.id !== action.payload), 
        error: null 
      }; 
    case FETCH_USER_FAILURE:
    case FETCH_ALL_USERS_FAILURE:
    case CREATE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default userReducer;
