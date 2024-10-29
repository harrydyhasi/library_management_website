import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Change here
import rootReducer from '../reducers/index'; // Adjust path as needed

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) 
);

export default store;
