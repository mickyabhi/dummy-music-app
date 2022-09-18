import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseURL } from '../constants/index';

const initialState = {
  series: [],
  meditation: [],
  categories: [],
  status: 'loading',
  error: null,
};

export const fetchMeditationData = createAsyncThunk(
  'meditation/meditationData',
  async language => {
    if (language === 'hi') {
      const response = await axios.get(
        BaseURL + '/meditation_app_content_test.json',
      );

      return response.data;
    }
    if (language !== null && language !== 'hi') {
      const response = await axios.get(
        BaseURL +
          `/meditation_content/${language}/meditation_content_${language}.json`,
      );
      return response.data;
    }
  },
);

export const meditationSlice = createSlice({
  name: 'meditation',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMeditationData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMeditationData.fulfilled, (state, action) => {
        state.meditation = [];
        state.categories = [];
        state.series = [];
        state.status = 'success';
        state.meditation = state.meditation
          .concat(action.payload.data.filter(obj => obj.type !== 'Series'))
          .sort((a, b) => b.order - a.order);
        state.categories = state.categories
          .concat(action.payload.categories)
          .sort((a, b) => a.order - b.order);
        state.series = state.series
          .concat(action.payload.data.filter(obj => obj.type === 'Series'))
          .sort((a, b) => a.order - b.order);
      })
      .addCase(fetchMeditationData.rejected, (state, action) => {
        state.status = 'failed';
        state.meditation = [];
        state.error = action.error.message;
      });
  },
});

export const { _ } = meditationSlice.actions;

export default meditationSlice.reducer;

export const fetchedMeditationData = state => state.meditation.meditation;
