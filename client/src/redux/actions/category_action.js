// src/redux/actions/categoryActions.js
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE
} from './types';

import {
  fetchCategories as fetchCategoriesService,
  createCategory as createCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService
} from '../../services/category_service';

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    try {
      const response = await fetchCategoriesService();
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: response.data.categories,
      });
    } catch (error) {
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createCategory = (categoryData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const response = await createCategoryService(categoryData);
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
        payload: response.data.category,
      });
      dispatch(fetchCategories()); 
    } catch (error) {
      dispatch({
        type: CREATE_CATEGORY_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateCategory = (categoryId, categoryData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    try {
      const response = await updateCategoryService(categoryId, categoryData);
      dispatch({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: response.data.category,
      });
      dispatch(fetchCategories()); 
    } catch (error) {
      dispatch({
        type: UPDATE_CATEGORY_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteCategory = (categoryId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    try {
      await deleteCategoryService(categoryId);
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: categoryId,
      });
      dispatch(fetchCategories()); 
    } catch (error) {
      dispatch({
        type: DELETE_CATEGORY_FAILURE,
        payload: error.message,
      });
    }
  };
};
