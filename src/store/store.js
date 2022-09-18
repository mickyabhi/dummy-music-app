import { configureStore } from '@reduxjs/toolkit';
import StoriesReducer from './StoriesSlice';
import MusicsReducer from './MusicsSlice';
import MeditationReducer from './MeditationSlice';
import ZensparksReducer from './ZensparkSlice';
import UiReducer from './UiSlice';
import OnboardinSlice from './OnboardingSlice';
import userInfoReducer from './UserInfoSlice';
import productBannerSlice from './ProductBannerSlice';

const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    stories: StoriesReducer,
    musics: MusicsReducer,
    meditation: MeditationReducer,
    zensparks: ZensparksReducer,
    ui: UiReducer,
    onboarding: OnboardinSlice,
    userInfo: userInfoReducer,
    bannerData: productBannerSlice,
  },
});

export default store;
