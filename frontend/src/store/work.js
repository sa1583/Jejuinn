import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const workSlice = createSlice({
  name: 'work',
  initialState: {
    isOnWrite: false,
  },
  reducers: {
    changeIsOnWrite: (state) => {
      state.isOnWrite = !state.isOnWrite;
    },
  },
});

export const { changeIsOnWrite } = workSlice.actions;
export const selectIsOnWrite = (state) => state.work.isOnWrite;
export default workSlice;
