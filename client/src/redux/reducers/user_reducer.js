// reducer.js
import { 
  FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
  FETCH_ALL_USERS_REQUEST, FETCH_ALL_USERS_SUCCESS, FETCH_ALL_USERS_FAILURE,
  CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
} from '../actions/types';

const initialState = {
  loading: false,
  user: {},
  allUsers: [],
  error: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
    case FETCH_ALL_USERS_REQUEST:
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: '' };
    case FETCH_ALL_USERS_SUCCESS:
      return { ...state, loading: false, allUsers: action.payload, error: '' };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, new_user: action.payload  }; 
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, error: '' }; 
    case DELETE_USER_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        allUsers: state.allUsers.filter(user => user.id !== action.payload), 
        error: '' 
      }; 
    case FETCH_USER_FAILURE:
    case FETCH_ALL_USERS_FAILURE:
    case CREATE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
