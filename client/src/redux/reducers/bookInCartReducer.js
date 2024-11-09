import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    booksInCart: [
    ],
  },
  reducers: {
    addBookToCart: (state, action) => {
      const book = action.payload;
      const existingBook = state.booksInCart.find(b => b.bookId === book.bookId);
      
      if (!existingBook) {
        state.booksInCart.push(book);
      }
    },
    removeBookFromCart: (state, action) => {
      const bookId = action.payload;
      state.booksInCart = state.booksInCart.filter(book => book.bookId !== bookId);
    },
    clearCart: (state) => {
      state.booksInCart = [];
    },
  }
});

export const { addBookToCart, removeBookFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
