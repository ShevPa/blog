import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadData = createAsyncThunk(
  'articlesList/loadData',
  async function (page, { rejectWithValue }) {
    try {
      const offset = (page - 1) * 20;
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        const { status, data } = await axios.get(
          `https://blog.kata.academy/api/articles?offset=${offset}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          },
        );
        if (status !== 200) throw new Error("Oop's something went wrong");
        return data;
      } else {
        const { status, data } = await axios.get(
          `https://blog.kata.academy/api/articles?offset=${offset}`,
        );
        if (status !== 200) throw new Error("Oop's something went wrong");
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const articlesSlice = createSlice({
  name: 'articlesList',
  initialState: {
    articles: [],
    status: null,
    error: null,
    currentPage: 1,
    pageCount: 0,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadData.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadData.fulfilled, (state, action) => {
      state.status = 'completed';
      state.articles = action.payload.articles;
      state.pageCount = Math.ceil(action.payload.articlesCount / 20);
    });
    builder.addCase(loadData.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});
export const { setCurrentPage } = articlesSlice.actions;
export default articlesSlice.reducer;
