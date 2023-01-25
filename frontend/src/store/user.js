import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginNaver, getUserInfo, loginKakao, loginNormal } from '../api/user';

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
    console.log('token', token);
    try {
      const { data } = (await loginNaver(token)).headers;
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그인 실패' });
    }
  },
);

export const getKakaoAuthToken = createAsyncThunk(
  'user/getKakaoAuthToken',
  async (token, thunkAPI) => {
    try {
      const { data } = (await loginKakao(token)).headers
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그인 실패'})
    }
  }
  
)

export const getNormalAuthToken = createAsyncThunk(
  'user/getNormalAuthToken',
  async (body, thunkAPI) => {
    try {
      const {data} = (await loginNormal(body)).headers
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue({ errorMessage: '로그인 실패'})
    }
  }
)

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
      .addCase(getNaverAuthToken.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isLogin = true;
      })
      .addCase(getNaverAuthToken.rejected, () => {
        alert('실패!');
      })
      .addCase(getUserInfoByToken.pending, (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      })
      .addCase(getKakaoAuthToken.fulfilled, (state, action) => {
        // state.userInfo = action.payload;
        // state.isLogin = true;
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
      .addCase(getKakaoAuthToken.rejected, () => {
        alert('실패!');
      })
      .addCase(getNormalAuthToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken
      })
      // .addCase(getUserInfoByToken.fulfilled, (state, action) => {
      //   state.userInfo = action.payload;
      //   state.isLogin = true;
      // })
  },
});

export default userSlice;
export const { login } = userSlice.actions;
