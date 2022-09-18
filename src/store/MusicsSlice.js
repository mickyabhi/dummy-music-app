import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseURL } from '../constants/index';

const initialState = {
  musics: [],
  series: [],
  categories: [],
  load: true,
  error: null,
};

export const fetchMusicsData = createAsyncThunk(
  'musics/musicsData',
  async () => {
    const response = await axios.get(BaseURL + '/musics_app_content_test.json');
    return response.data;
  },
);

export const musicsSlice = createSlice({
  name: 'musics',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMusicsData.pending, (state, action) => {
        state.load = true;
      })
      .addCase(fetchMusicsData.fulfilled, (state, action) => {
        state.musics = [];
        state.series = [];
        state.categories = [];
        state.load = false;
        state.musics = state.musics
          .concat(action.payload.data.filter(obj => obj.type !== 'Series'))
          .sort((a, b) => b.order - a.order);
        state.series = state.series
          .concat(action.payload.data.filter(obj => obj.type === 'Series'))
          .sort((a, b) => b.order - a.order);
        state.categories = state.categories
          .concat(action.payload.categories)
          .sort((a, b) => a.order - b.order);
      })
      .addCase(fetchMusicsData.rejected, (state, action) => {
        state.load = false;
        state.error = action.error.message;
      });
  },
});

export const { _ } = musicsSlice.actions;

export default musicsSlice.reducer;

export const fetchedMusicsData = state => state.musics.musics;
