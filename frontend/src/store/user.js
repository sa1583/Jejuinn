import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserInfo, getNaverAccessToken, getOurTokens } from '../api/user';

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
  async (token, thunkAPI) => {
    try {
      const { accessToken, refreshToken } = (await getOurTokens(token)).headers;
      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {}
  },
);

export const getNaverTokens = createAsyncThunk(
  'user/getNaverTokens',
  async (token, thunkAPI) => {
    try {
      const { access_token } = (await getNaverAccessToken(token)).data;
      return access_token;
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
    builder.addCase(getUserInfoByToken.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export default userSlice;
export const { login } = userSlice.actions;
