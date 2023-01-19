import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginNaver, getUserInfo } from '../api/user';

export const getNaverAuthToken = createAsyncThunk(
  'user/getNaverAuthToken',
  async (token, thunkAPI) => {
    try {
      return (await loginNaver(token))?.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    userInfo: null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    login: ({ isLogin, userInfo }, action) => {
      isLogin = true;
      userInfo = action.payload;
    },
  },
  extraReducers: {
    [getNaverAuthToken.fulfilled.type]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userInfo = getUserInfo(state.accessToken).data;
      state.isLogin = true;
    },
  },
});

export default userSlice;
export const { login } = userSlice.actions;
