import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async function (userData, { rejectWithValue }) {
    try {
      const { data } = await axios.put(
        `https://blog.kata.academy/api/user`,
        {
          user: {
            email: userData.email,
            username: userData.username,
            password: userData.password,
            image: userData.image,
            bio: null,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${JSON.parse(localStorage.getItem('token'))}`,
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: null,
    status: null,
  },
  reducers: {
    clearState(state) {
      state.status = null;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.status = 'Completed';
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = 'Rejected';
      state.user = null;
      state.error = action.payload;
    });
  },
});
export const { clearState } = userSlice.actions;
export default userSlice.reducer;
