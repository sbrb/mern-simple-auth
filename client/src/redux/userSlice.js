import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { REGISTER, LOGIN } from '../graphql/mutations';
import client from '../graphql/client';
import { GET_ME } from '../graphql/queries';
import {jwtDecode} from 'jwt-decode';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const setCookie = (name, value, days) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

export const registerUser = createAsyncThunk('user/register', async (userData, thunkAPI) => {
  try {
    const { data } = await client.mutate({
      mutation: REGISTER,
      variables: userData,
    });
    setCookie('token', data.register.token, 1); 
    return data.register.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('user/login', async (userData, thunkAPI) => {
  try {
    const { data } = await client.mutate({
      mutation: LOGIN,
      variables: userData,
    });
    setCookie('token', data.login.token, 1);
    return data.login.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getMe = createAsyncThunk('user/getMe', async (_, thunkAPI) => {
  try {
    const token = document.cookie.split(';').find(item => item.trim().startsWith('token='));
    if (token) {
      const decoded = jwtDecode(token.split('=')[1]);
      const { data } = await client.query({
        query: GET_ME,
        variables: { id: decoded.id },
      });
      return data.me;
    }
    return thunkAPI.rejectWithValue('No token found');
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
