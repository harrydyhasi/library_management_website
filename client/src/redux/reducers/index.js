// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import categoryReducer from './category_reducer';
import bookReducer from './book_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  book: bookReducer,
  // other reducers...
});

export default rootReducer;

