import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserInfo, getOurTokens } from '../api/user';

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

export const getOurTokensFromServer = createAsyncThunk(
  'user/getOurTokensFromServer',
  async (data, thunkAPI) => {
    try {
      const { token, state } = data;
      const { accessToken, refreshToken } = (await getOurTokens(token, state))
        .headers;
      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '서버 로그인 실패' });
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
      .addCase(getUserInfoByToken.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(getOurTokensFromServer.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      });
  },
});

export default userSlice;
export const { login } = userSlice.actions;
