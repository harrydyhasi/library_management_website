import {
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_FAILURE,
  FETCH_ALL_BOOKS_REQUEST,
  FETCH_ALL_BOOKS_SUCCESS,
  FETCH_ALL_BOOKS_FAILURE,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILURE,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
} from '../actions/types';

const initialState = {
  loading: false,
  books: [],
  error: '',
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOK_REQUEST:
    case FETCH_ALL_BOOKS_REQUEST:
    case CREATE_BOOK_REQUEST:
    case UPDATE_BOOK_REQUEST:
    case DELETE_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: state.books.map(book => 
          book.id === action.payload.id ? action.payload : book
        ),
        error: '',
        
      };
      case FETCH_ALL_BOOKS_SUCCESS:
        return {
          ...state,
          loading: false,
          books: action.payload, 
          error: '',
        };
      
    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: [...state.books, action.payload], 
        error: '',
      };
      case UPDATE_BOOK_SUCCESS:
        if (action.payload) {
          return {
            ...state,
            books: state.books.map(book =>
              book.id === action.payload.id ? action.payload : book
            ),
          };
        }
        return state; 
      
    case DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: state.books.filter((book) => book.id !== action.payload), 
        error: '',
      };
    case FETCH_BOOK_FAILURE:
    case FETCH_ALL_BOOKS_FAILURE:
    case CREATE_BOOK_FAILURE:
    case UPDATE_BOOK_FAILURE:
    case DELETE_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookReducer;
