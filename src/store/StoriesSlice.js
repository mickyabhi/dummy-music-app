import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseURL } from '../constants/index';

const initialState = {
  series: [],
  stories: [],
  highlightStories: [],
  load: true,
  error: null,
};

export const getStoriesData = createAsyncThunk('stories', async language => {
  const response = await axios.get(
    `${BaseURL}/content/${language}/stories_${language}.json`,
  );
  return response.data;
});

export const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getStoriesData.pending, (state, action) => {
        state.load = true;
      })
      .addCase(getStoriesData.fulfilled, (state, action) => {
        state.load = false;
        state.series = [];
        state.stories = [];
        state.categories = [];
        state.highlightStories = [];

        state.stories = state.stories
          .concat(action.payload.data.filter(obj => obj.type !== 'Series'))
          .sort((a, b) => b.order - a.order);
        state.series = state.series
          .concat(action.payload.data.filter(obj => obj.type === 'Series'))
          .sort((a, b) => b.order - a.order);
        state.categories = state.categories
          .concat(action.payload.categories)
          .sort((a, b) => a.order - b.order);
      })
      .addCase(getStoriesData.rejected, (state, action) => {
        state.load = false;
        state.error = action.error.message;
      });
  },
});
export const { resetStories } = storiesSlice.actions;

export default storiesSlice.reducer;

export const fetchedStoriesData = state => state.stories.stories;

export const fetchedhiglightedStoriesData = state =>
  state.stories.highlightStories;
