import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BaseURL } from '~/constants';

const initialState = {
  activityModal: false,
  rateUsModal: false,
  loading: false,
  sleepTimer: null,
  currentLanguage: null,
  currentTrack: {},
  previousTrack: {},
  availableLanguages: {},
  cartCount: 0,
  isShop: false,
  shopifyClient: null,
  isQuote: false,
  isMusic: false,
  categoryRefresh: false,
  prevSubCategory: 'All',
  prevCategory: null,
  initRoute: 'Stories',
  moeNotificationPayload: null,
};

export const getAvailableLanguages = createAsyncThunk(
  'availableLanguages',
  async () => {
    const response = await axios.get(`${BaseURL}/available_languages.json`);
    return response.data;
  },
);

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleActivityModal(state, action) {
      state.activityModal = action.payload;
    },
    toggleRateUsModal(state, action) {
      state.rateUsModal = action.payload;
    },

    updateLanguagePreference(state, action) {
      state.currentLanguage = action.payload;
    },
    updateCurrentTrack(state, action) {
      state.currentTrack = action.payload;
    },
    setSleepTimer(state, action) {
      state.sleepTimer = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCartCount(state, action) {
      state.cartCount = action.payload;
    },
    setIsShop(state, action) {
      state.isShop = action.payload;
    },
    setIsQuote(state, action) {
      state.isQuote = action.payload;
    },
    setIsMusic(state, action) {
      state.isMusic = action.payload;
    },
    setShopifyClient(state, action) {
      state.shopifyClient = action.payload;
    },
    setCategoryRefresh(state, action) {
      state.categoryRefresh = action.payload;
    },
    setPrevSubCategory(state, action) {
      state.prevSubCategory = action.payload;
    },
    setPrevCategory(state, action) {
      state.prevCategory = action.payload;
    },
    setPreviousTrack(state, action) {
      state.previousTrack = action.payload;
    },
    setInitRoute(state, action) {
      state.initRoute = action.payload;
    },
    setMoeNotificationPayload: (state, action) => {
      state.moeNotificationPayload = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAvailableLanguages.fulfilled, (state, action) => {
        state.loading = false;
        console.log(
          'AVAILABLE LANGUAGES PAYLOAD',
          action.payload.available_languages,
        );
        state.availableLanguages = action.payload.available_languages;
      })
      .addCase(getAvailableLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  extraReducers(builder) {
    builder
      .addCase(getAvailableLanguages.fulfilled, (state, action) => {
        state.loading = false;
        state.availableLanguages = action.payload.available_languages;
      })
      .addCase(getAvailableLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateLanguagePreference,
  toggleActivityModal,
  toggleRateUsModal,
  setCurrentSong,
  updateCurrentTrack,
  setSleepTimer,
  setLoading,
  setCartCount,
  setIsShop,
  setIsQuote,
  setIsMusic,
  setShopifyClient,
  setCategoryRefresh,
  setPrevSubCategory,
  setPrevCategory,
  setPreviousTrack,
  setInitRoute,
  setMoeNotificationPayload,
} = uiSlice.actions;

export default uiSlice.reducer;
