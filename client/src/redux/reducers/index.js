// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import categoryReducer from './category_reducer';
import borrowSlipReducer from './borrowSlipReducer';
import configReducer from './config';


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  borrowSlips: borrowSlipReducer,
  config: configReducer
  // other reducers...
});

export default rootReducer;

