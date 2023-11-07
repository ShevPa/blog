import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk(
  'auth/createUser',
  async function (userData, { rejectWithValue }) {
    try {
      const { data } = await axios.post(`https://blog.kata.academy/api/users`, {
        user: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });
      return data;
    } catch (error) {
      if (error.response.status === 422)
        return rejectWithValue(error.response.data.errors);
      return rejectWithValue(error.message);
    }
  },
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async function (userData, { rejectWithValue }) {
    try {
      const { data } = await axios.post(
        `https://blog.kata.academy/api/users/login`,
        {
          user: {
            email: userData.email,
            password: userData.password,
          },
        },
      );
      return data;
    } catch (error) {
      if (error.response.status === 422)
        return rejectWithValue(error.response.data.errors);
      return rejectWithValue(error.message);
    }
  },
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: null,
    error: null,
  },
  reducers: {
    clearState(state) {
      state.user = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = 'Completed';
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'Rejected';
      state.user = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = 'Completed';
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'Rejected';
      state.user = null;
    });
  },
});
export const { clearState } = authSlice.actions;
export default authSlice.reducer;
