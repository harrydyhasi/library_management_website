import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import borrowSlipService from '../../services/borrow_slip_service';

export const fetchBorrowSlips = createAsyncThunk(
  'borrowSlips/fetchBorrowSlips',
  async (_, { rejectWithValue }) => {
    try {
      const response = await borrowSlipService.getAll();
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const addBorrowSlip = createAsyncThunk(
  'borrowSlips/addBorrowSlip',
  async (newSlip, {rejectWithValue }) => {
    try {
      const response = await borrowSlipService.add(newSlip); 
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateBorrowSlip = createAsyncThunk(
  'borrowSlips/updateBorrowSlip',
  async ({ id, updatedData }, {rejectWithValue }) => {
    try {
      const response = await borrowSlipService.update(id, updatedData);
      // dispatch(fetchBorrowSlips())
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteBorrowSlip = createAsyncThunk(
  'borrowSlips/deleteBorrowSlip',
  async (id, { rejectWithValue }) => {
    try {
      await borrowSlipService.delete(id); 
      return id; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const borrowSlipSlice = createSlice({
  name: 'borrowSlips',
  initialState: {
    list: [], 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorrowSlips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBorrowSlips.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; 
      })
      .addCase(fetchBorrowSlips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBorrowSlip.fulfilled, (state, action) => {
        const newBorrowSlip = action.payload.data;
        state.list.push(newBorrowSlip); 
      })
      .addCase(updateBorrowSlip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBorrowSlip.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBorrowSlip = action.payload.data;
        const index = state.list.findIndex(borrowSlip => borrowSlip._id === updatedBorrowSlip._id);
        if (index !== -1) {
          state.list[index] = updatedBorrowSlip; 
          
        }
      })
      .addCase(updateBorrowSlip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBorrowSlip.fulfilled, (state, action) => {
        state.list = state.list.filter(borrowSlip => borrowSlip._id !== action.payload); // Remove deleted slip
      });
  },
});


export default borrowSlipSlice.reducer;