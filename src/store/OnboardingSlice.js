import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  onboardingFormData: {
    user_data: {
      gender: null,
      birth_year: null,
    },
    user_responses: [],
  },
  screen_count: 1,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    initializeOnboarding: (state, action) => {
      state.onboardingFormData.user_data = action.payload.user_data;
      state.onboardingFormData.user_responses = action.payload.user_responses;
    },
    updateUserData: (state, action) => {
      state.onboardingFormData.user_data = action.payload.user_data;
    },
    updateFormResponse: (state, action) => {
      const { questionId, user_response, question } = action.payload;

      const index = state.onboardingFormData.user_responses.findIndex(
        response => response.questionId === questionId,
      );

      if (index !== -1) {
        state.onboardingFormData.user_responses[index] = {
          questionId,
          question,
          user_response,
        };
      } else {
        state.onboardingFormData.user_responses =
          state.onboardingFormData.user_responses.concat({
            questionId,
            user_response,
            question,
          });
      }
    },
    updateScreenCount: (state, action) => {
      if (action.payload.type === 'increment') {
        state.screen_count++;
      } else {
        state.screen_count--;
      }
    },
  },
});

export const { updateScreenCount } = onboardingSlice.actions;

export default onboardingSlice.reducer;
