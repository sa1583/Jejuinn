import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginNaver, getUserInfo } from '../api/user';

export const getUserInfoByToken = createAsyncThunk(
  'user/getUserInfoByToken',
  async (data, thunkAPI) => {
    try {
      return (await getUserInfo(data.accessToken))?.data;
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
    try {
      const { accesstoken, refreshtoken } = (await loginNaver(token)).headers;
      return {
        accessToken: accesstoken,
        refreshToken: refreshtoken,
      };
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
      .addCase(getNaverAuthToken.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.isLogin = true;
      })
      .addCase(getNaverAuthToken.rejected, () => {
        alert('실패!');
      })
      .addCase(getUserInfoByToken.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

export default userSlice;
export const { login } = userSlice.actions;
