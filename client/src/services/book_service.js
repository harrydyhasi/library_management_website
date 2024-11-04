import api from '../utils/http/http_client';

export const fetchBooks = (bookId) => {
    return api.get(`/book/${bookId}`); 
}

export const fetchAllBooks = () => {
    return api.get('/book').then(response => {
        console.log("Books fetched from API:", response.data);
        return response;
    });
}

export const createBook = (bookData) => {
    return api.post('/book', bookData); 
}

export const updateBook = (bookId, bookData) => {
    return api.put(`/book/${bookId}`, bookData); 
}

export const deleteBook = (bookId) => {
    return api.delete(`/book/${bookId}`); 
}
