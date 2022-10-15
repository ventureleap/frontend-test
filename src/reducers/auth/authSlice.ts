import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'app/store';
import {
  User,
  UserLoginError,
  UserLoginPayload,
  UserLoginResponse,
  UserRegisterPayload
} from 'models/auth.model';
import { loginReq, registerReq, fetchUserReq } from './authAPI';
import { getCookie, removeCookie } from 'helpers/cookies';

export interface UserState {
  user: null | User;
  token: null | string;
  status: 'idle' | 'fetching' | 'logging' | 'registering' | 'failed';
}

const initialState: UserState = {
  user: null,
  token: null,
  status: 'fetching'
};

export const login = createAsyncThunk(
  'auth/loginReq',
  async (formData: UserLoginPayload, { rejectWithValue }) => {
    try {
      const response = await loginReq(formData);
      return response.data as UserLoginResponse;
    } catch (err) {
      const error = err as AxiosError<UserLoginError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/registerReq',
  async (formData: UserRegisterPayload, { rejectWithValue }) => {
    try {
      const response = await registerReq(formData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<UserLoginError>;
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk('auth/fetchUserReq', async (_, { rejectWithValue }) => {
  try {
    if (!getCookie('sessionId')) {
      throw new Error('No stored cookie')
    }
    const response = await fetchUserReq();
    return response.data;
  } catch (err) {
    const error = err as AxiosError<UserLoginError>;
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
    
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      removeCookie('sessionId')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'logging';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = {
          username: action.payload.username
        }
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'registering';
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(register.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'fetching';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = {
          username: action.payload.username
        }
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
      });
  }
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
