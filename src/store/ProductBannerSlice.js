import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseURL } from '~/constants';
const initialState = {
  bannerData: null,
  loading: true,
  error: null,
};
export const getBannerData = createAsyncThunk('productsBanner', async () => {
  const res = await axios.get(BaseURL + '/banners-content.json');
  return res.data.data;
});
const bannerDataSlice = createSlice({
  name: 'bannerData',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBannerData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getBannerData.fulfilled, (state, action) => {
        state.loading = false;
        state.bannerData = action.payload.sort((a, b) => a.order - b.order);
      })
      .addCase(getBannerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default bannerDataSlice.reducer;
