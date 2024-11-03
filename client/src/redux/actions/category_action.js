import axios from 'axios';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    try {
      const response = await axios.get('http://localhost:3000/api/category');
      console.log("Dữ liệu trả về từ API:", response.data);
console.log("Categories:", response.data.categories);
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: response.data.categories, // Truyền categories thay vì toàn bộ response.data
      });
      
    } catch (error) {
      console.error('Error fetching categories:', error.message); // Xử lý lỗi
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        payload: error.message,
      });
    }
  };
};
