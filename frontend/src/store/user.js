import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getOurTokens,
  getUserInfo,
  loginGoogle,
  loginKakao,
  loginNormal,
  signUpApi,
  processNaverAuth,
  userLogout,
  renewAccessToken,
} from '../api/user';

export const getUserInfoByToken = createAsyncThunk(
  'user/getUserInfoByToken',
  async (token, thunkAPI) => {
    try {
      return (await getUserInfo(token)).data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        errorMessage: '유저 정보 가져오기 실패',
      });
    }
  },
);

/**
 * refreshToken으로 accessToken을 재발급받아 store내의 accessToken을 업데이트
 */
export const renewAccessTokenByRefreshToken = createAsyncThunk(
  'user/renewAccessTokenByRefreshToken',
  async (refreshToken, thunkAPI) => {
    try {
      return (await renewAccessToken(refreshToken)).headers;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        errorMessage: 'accessToken 갱신 실패',
      });
    }
  },
);

export const getOurTokensFromServer = createAsyncThunk(
  'user/getOurTokensFromServer',
  async (data, thunkAPI) => {
    try {
      const { token, state } = data;
      const { accesstoken, refreshtoken } = (await getOurTokens(token, state))
        .headers;
      return {
        accessToken: accesstoken.split(' ')[1],
        refreshToken: refreshtoken.split(' ')[1],
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
      let { accesstoken, refreshtoken } = (await loginGoogle(token)).headers;
      accesstoken = accesstoken.split(' ')[1];
      refreshtoken = refreshtoken.split(' ')[1];
      return { accesstoken, refreshtoken };
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
      let { accesstoken, refreshtoken } = (await loginKakao(token)).headers;
      accesstoken = accesstoken.split(' ')[1];
      refreshtoken = refreshtoken.split(' ')[1];
      return { accesstoken, refreshtoken };
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그인 실패' });
    }
  },
);

export const getNormalAuthToken = createAsyncThunk(
  'user/getNormalAuthToken',
  async (body, thunkAPI) => {
    try {
      let { accesstoken, refreshtoken } = (await loginNormal(body)).headers;
      accesstoken = accesstoken.split(' ')[1];
      refreshtoken = refreshtoken.split(' ')[1];
      return { accesstoken, refreshtoken };
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그인 실패' });
    }
  },
);
export const getNormalAuthTokenInSignUp = createAsyncThunk(
  'user/getNormalAuthToken',
  async (body, thunkAPI) => {
    try {
      let { accesstoken, refreshtoken } = (await signUpApi(body)).headers;
      accesstoken = accesstoken.split(' ')[1];
      refreshtoken = refreshtoken.split(' ')[1];

      return { accesstoken, refreshtoken };
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그인 실패' });
    }
  },
);

// 네이버 인증
export const naverAuth = createAsyncThunk(
  'user/naverAuth',
  async ({ accessToken, socialToken }, thunkAPI) => {
    try {
      await processNaverAuth(accessToken, socialToken);
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: '네이버 인증 실패' });
    }
  },
);

// 로그아웃
export const logout = createAsyncThunk(
  'user/logout',
  async ({ accessToken, uid }, thunkAPI) => {
    try {
      if (!accessToken || !uid) return;
      await userLogout(accessToken, uid);
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그아웃 실패' });
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
    myGuestHouses: [],
    myRecruitments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoByToken.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
        state.isLogin = true;
      })
      .addCase(getOurTokensFromServer.fulfilled, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      })
      .addCase(getKakaoToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accesstoken;
        state.refreshToken = action.payload.refreshtoken;
      })
      .addCase(getKakaoToken.rejected, () => {
        alert('실패!');
      })
      .addCase(getGoogleToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accesstoken;
        state.refreshToken = action.payload.refreshtoken;
      })
      .addCase(getGoogleToken.rejected, () => {
        alert('실패!');
      })
      .addCase(getNormalAuthToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accesstoken;
        state.refreshToken = action.payload.refreshtoken;
      })
      .addCase(renewAccessTokenByRefreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accesstoken.split(' ')[1];
      })
      .addCase(logout.pending, (state, action) => {
        state.isLogin = false;
        state.userInfo = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export default userSlice;
export const selectIsLogin = (state) => state.user.isLogin;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectAccessToken = (state) => state.user.accessToken;
export const selectRefreshToken = (state) => state.user.refreshToken;
