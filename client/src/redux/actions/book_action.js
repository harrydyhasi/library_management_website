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
  } from './types';
  
  import {
    fetchBooks as fetchBookService,
    fetchAllBooks as fetchAllBooksService,
    createBook as createBookService,
    updateBook as updateBookService,
    deleteBook as deleteBookService,
  } from '../../services/book_service';
  
  export const fetchBooks = (bookId) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_BOOK_REQUEST });
      try {
        const response = await fetchBookService(bookId);
        dispatch({
          type: FETCH_BOOK_SUCCESS,
          payload: response.data.book,
        });
      } catch (error) {
        dispatch({
          type: FETCH_BOOK_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  
  export const fetchAllBooks = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_ALL_BOOKS_REQUEST });
        try {
            const response = await fetchAllBooksService();
            console.log("Books API:", response.data);
            dispatch({
                type: FETCH_ALL_BOOKS_SUCCESS,
                payload: response.data.data, 
            });
        } catch (error) {
            console.error("Error fetching books:", error);
            dispatch({
                type: FETCH_ALL_BOOKS_FAILURE,
                payload: error.response ? error.response.data.message : error.message,
            });
        }
    };
};

export const createBook = (bookData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_BOOK_REQUEST });
    try {
      console.log("Dữ liệu gửi đi thêm sách:", bookData);
      const response = await createBookService(bookData);
      dispatch({
        type: CREATE_BOOK_SUCCESS,
        payload: response.data.book,
      });
      dispatch(fetchAllBooks());
    } catch (error) {
      dispatch({
        type: CREATE_BOOK_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateBook = (bookId, bookData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_BOOK_REQUEST });
    try {
      const response = await updateBookService(bookId, bookData);
      console.log("Dữ liệu gửi đi:", bookData);
      console.log("Phản hồi từ API:", response);
      dispatch({
        type: UPDATE_BOOK_SUCCESS,
        payload: response.data.book,
      });
      dispatch(fetchAllBooks()); 
    } catch (error) {
      console.error("Lỗi khi cập nhật sách:", error.response ? error.response.data : error.message); 
      dispatch({
        type: UPDATE_BOOK_FAILURE,
        payload: error.message,
      });
    }
  };
};

  export const deleteBook = (bookId) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_BOOK_REQUEST });
      try {
        await deleteBookService(bookId);
        dispatch({
          type: DELETE_BOOK_SUCCESS,
          payload: bookId,
        });
        dispatch(fetchAllBooks()); 
      } catch (error) {
        dispatch({
          type: DELETE_BOOK_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  