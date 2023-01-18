import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
