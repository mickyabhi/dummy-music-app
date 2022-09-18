import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  phoneNumber: '',
  email: '',
  isLoggedIn: false,
  id: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUserInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
