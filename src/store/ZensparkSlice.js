import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseURL } from '../constants/index';

const initialState = {
  zensparks: {},
  load: true,
  error: null,
};

export const fetchZensparksData = createAsyncThunk(
  'zensparks/zensparksData',
  async () => {
    const {
      data: { data },
    } = await axios.get(BaseURL + '/zenspark_app_content.json');
    return data;
  },
);

export const zensparksSlice = createSlice({
  name: 'zensparks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchZensparksData.pending, state => {
        state.load = true;
      })
      .addCase(fetchZensparksData.fulfilled, (state, action) => {
        const zensparks = Object.keys(action.payload).reduce(
          (acc, category) => {
            acc[category] = action.payload[category];
            return acc;
          },
          {},
        );
        state.zensparks = zensparks;
        state.load = false;
      })
      .addCase(fetchZensparksData.rejected, (state, action) => {
        state.load = false;
        state.error = action.error.message;
      });
  },
});

export const { _ } = zensparksSlice.actions;

export default zensparksSlice.reducer;

export const fetchedZensparksData = state => {
  return state?.zensparks?.zensparks;
};

export const fetchedZensparksData_todays_spark = state => {
  return state.zensparks.zensparks.todays_spark;
};
export const fetchedZensparksData_good_night_messages = state =>
  state.zensparks.zensparks.good_night_messages;
