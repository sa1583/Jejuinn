import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOurTokens, getUserInfo, loginGoogle , loginKakao, loginNormal } from '../api/user';


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
export const getGoogleToken = createAsyncThunk(
  'user/getGoogleToken',
  async (token, thunkAPI) => {
    try {
      const { data } = (await loginGoogle(token)).headers;
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그인 실패' });
    }
  },
);

// 카카오에서 발급한 access_token을 BE 서버에 보냄
// BE 서버에서 새로 발급한 acces_token과 refresh_token을 받는 로직
export const getKakaoToken = createAsyncThunk(
  'user/getKakaoAuthToken',
  async (token, thunkAPI) => {
    try {
      const { data } = (await loginKakao(token)).headers;
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그인 실패' });
    }
  },
);

export const getNormalAuthToken = createAsyncThunk(
  'user/getNormalAuthToken',
  async (body, thunkAPI) => {
    try {
      const { data } = (await loginNormal(body)).headers;
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그인 실패' });
    }
  },
);

// userInfo에는 유저 인가코드가 들어가는건가?
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
      })
      .addCase(getKakaoToken.fulfilled, (state, action) => {
        // state.userInfo = action.payload;
        // state.isLogin = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(getKakaoToken.rejected, () => {
        alert('실패!');
      })
      .addCase(getNormalAuthToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      });
    // .addCase(getUserInfoByToken.fulfilled, (state, action) => {
    //   state.userInfo = action.payload;
    //   state.isLogin = true;
    // })
  },
});

export default userSlice;
export const { login } = userSlice.actions;
