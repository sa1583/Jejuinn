import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginNaver, getUserInfo } from '../api/user';

export const getUserInfoByToken = createAsyncThunk(
  'user/getUserInfoByToken',
  async (token, thunkAPI) => {
    try {
      return (await getUserInfo(token))?.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        errorMessage: '유저 정보 가져오기 실패',
      });
    }
  },
);

export const getNaverAuthToken = createAsyncThunk(
  'user/getNaverAuthToken',
  async (token, thunkAPI) => {
    console.log('token', token);
    try {
      const { data } = await loginNaver(token);
      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('refreshToken', data.refreshToken);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그인 실패' });
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNaverAuthToken.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLogin = true;
      })
      .addCase(getNaverAuthToken.rejected, () => {
        alert('실패!');
      });
  },
});

export default userSlice;
export const { login } = userSlice.actions;
