import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Login, Register } from '../../types';
import { loginUser, registerUser } from './userAPI';
import Cookies from 'universal-cookie';

const initialState = {
  signupStatus: 'idle', // should be a enum
  loginStatus: 'idle', // should be a enum
};

export const loginAsync = createAsyncThunk(
  'user/login',
  async (user: Login) => {
    const response = await loginUser(user);
    return response.data;
  }
);

// ideally a separate reducer in the future
export const signupAsync = createAsyncThunk(
  'user/signup',
  async (user: Register) => {
    // I didn't understand at what point do I pass email/firstname/lastname, so just used an example fields
    const response = await registerUser({
      username: user.firstName,
      password: user.password,
    });

    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.signupStatus = 'loading';
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.signupStatus = `success, ${JSON.stringify(action.payload)}`;
      })
      .addCase(signupAsync.rejected, (state) => {
        state.signupStatus = 'failed';
      })
      .addCase(loginAsync.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loginStatus = `success, ${JSON.stringify(action.payload)}`;

        new Cookies().set('sessionId', action.payload.session, {
          secure: true,
          sameSite: 'none',
        });
      })
      .addCase(loginAsync.rejected, (state) => {
        state.loginStatus = 'failed';
      });
  },
});

export const selectSignupStatus = (state: RootState) => state.user.signupStatus;
export const selectLoginStatus = (state: RootState) => state.user.loginStatus;

export default userSlice.reducer;
