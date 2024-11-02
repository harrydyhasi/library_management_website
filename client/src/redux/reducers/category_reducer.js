// src/reducers/categoryReducer.js
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actions/category_action';

const initialState = {
  loading: false,
  categories: [],
  error: '',
};

const categoryReducer = (state = initialState, action) => {
  console.log("Action received:", action);
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      console.log("Fetched categories:", action.payload);
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: '',
      };
    case FETCH_CATEGORIES_FAILURE:
      console.error("Fetch categories failed:", action.payload);
      return {
        ...state,
        loading: false,
        categories: [],
        error: action.payload,
      };
    default:
      return state;
  }
};


export default categoryReducer;
