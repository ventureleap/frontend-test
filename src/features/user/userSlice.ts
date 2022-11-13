import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Register } from '../../types';
// import { User } from '../../types';
import { loginUser, registerUser } from './userAPI';

const initialState = {
  username: '',
  password: '',
  // status: '',
};

export const loginAsync = createAsyncThunk('user/login', async (user) => {
  // @ts-ignore
  const response = await loginUser(user);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const signUpAsync = createAsyncThunk(
  'user/login',
  async (user: Register) => {
    // I didn't undestand at what point do I pass email/firstname/lastname, but nvm
    const response = await registerUser({
      username: user.firstName,
      password: user.password,
    });
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        // state.status = 'idle';
        // state.value += action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        // state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
