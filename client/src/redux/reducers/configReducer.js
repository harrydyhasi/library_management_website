import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  config: null,
  loading: false,
  error: null,
};


export const fetchConfig = createAsyncThunk('config/fetchConfig', async () => {
  const response = await axios.get('http://localhost:3000/api/configs'); 
  return response.data.data; 
});


export const updateConfig = createAsyncThunk('config/updateConfig', async (config) => {
  const response = await axios.put(`http://localhost:3000/api/configs`, config); 
  return response.data.data; 
});


const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload; // Update state with new config
      })
      .addCase(updateConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the actions and the reducer
export const selectConfig = (state) => state.config.config;
export const selectLoading = (state) => state.config.loading;
export const selectError = (state) => state.config.error;

export default configSlice.reducer;
