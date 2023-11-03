import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadArticle = createAsyncThunk(
  'articlesList/loadArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const { status, data } = await axios.get(
        `https://blog.kata.academy/api/articles/${slug}`,
      );
      if (status !== 200) throw new Error("Oop's something went wrong");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    article: null,
    status: null,
    error: null,
  },
  redusers: {},
  extraReducers: (builder) => {
    builder.addCase(loadArticle.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loadArticle.fulfilled, (state, action) => {
      state.status = 'completed';
      state.article = action.payload.article;
    });
    builder.addCase(loadArticle.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    });
  },
});

export default articleSlice.reducer;
