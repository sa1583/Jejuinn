import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    isLogin: false,
    userInfo: null,
    accessToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.accessToken = action.payload;
    },
  },
});

export default authSlice;
export const { login } = authSlice.actions;
