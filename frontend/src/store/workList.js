import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUserWorkList = createAsyncThunk(
  'user/getUserWorkList',
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

const userWorkListSlice = createSlice({
  name: 'useWorkList',
  initialState: {
    workList: [],
  },
  reducers: {
    setUserWorkList: (state) => {},
  },
});

export const { setUserWorkList } = userWorkListSlice.actions;
export default userWorkListSlice;
