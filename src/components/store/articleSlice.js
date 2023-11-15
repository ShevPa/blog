import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadArticle = createAsyncThunk(
  'articles/loadArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        const { status, data } = await axios.get(
          `https://blog.kata.academy/api/articles/${slug}`,
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
          `https://blog.kata.academy/api/articles/${slug}`,
        );
        if (status !== 200) throw new Error("Oop's something went wrong");
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async function (articleData, { rejectWithValue }) {
    try {
      const tagList = articleData?.tag.map((item) => item.name);
      const { status, data } = await axios.post(
        `https://blog.kata.academy/api/articles`,
        {
          article: {
            title: articleData.title,
            description: articleData.description,
            body: articleData.text,
            tagList: tagList,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${JSON.parse(localStorage.getItem('token'))}`,
          },
        },
      );
      if (status !== 200) throw new Error("Oop's something went wrong");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async function (articleData, { rejectWithValue }) {
    try {
      const tagList = articleData?.tag.map((item) => item.name);
      const { status, data } = await axios.put(
        `https://blog.kata.academy/api/articles/${articleData.slug}`,
        {
          article: {
            title: articleData.title,
            description: articleData.description,
            body: articleData.text,
            tagList: tagList,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${JSON.parse(localStorage.getItem('token'))}`,
          },
        },
      );
      if (status !== 200) throw new Error("Oop's something went wrong");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async function (slug, { rejectWithValue }) {
    try {
      const { status, data } = await axios.delete(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${JSON.parse(localStorage.getItem('token'))}`,
          },
        },
      );
      if (status !== 200)
        throw new Error(
          'This page is not exist anymore. Go back to the main page',
        );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const toggleLike = createAsyncThunk(
  'articles/toggleLike',
  async function (data, { rejectWithValue }) {
    try {
      const isFavorite = data.favorited;
      const slug = data.slug;
      if (!isFavorite) {
        const { status, data } = await axios.post(
          `https://blog.kata.academy/api/articles/${slug}/favorite`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${JSON.parse(
                localStorage.getItem('token'),
              )}`,
            },
          },
        );
        if (status !== 200)
          throw new Error(
            'This page is not exist anymore. Go back to the main page',
          );
        return data;
      } else {
        const { status, data } = await axios.delete(
          `https://blog.kata.academy/api/articles/${slug}/favorite`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${JSON.parse(
                localStorage.getItem('token'),
              )}`,
            },
          },
        );
        if (status !== 200)
          throw new Error(
            'This page is not exist anymore. Go back to the main page',
          );
        return data;
      }
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
    actionsCount: 0,
  },
  reducers: {
    clearStatus(state) {
      state.status = null;
    },
  },
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
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.status = 'Completed';
      state.article = action.payload.article;
      state.actionsCount++;
    });
    builder.addCase(createArticle.rejected, (state, action) => {
      state.status = 'Rejected';
      state.error = action.payload;
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.status = 'Completed';
      state.article = action.payload.article;
      state.actionsCount++;
    });
    builder.addCase(updateArticle.rejected, (state, action) => {
      state.status = 'Rejected';
      state.error = action.payload;
    });
    builder.addCase(deleteArticle.fulfilled, (state) => {
      state.status = 'Deleted';
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.status = 'Rejected';
      state.actionsCount++;
      state.error = action.payload;
    });
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      state.status = 'liked';
      state.article = action.payload.article;
      state.actionsCount++;
    });
    builder.addCase(toggleLike.rejected, (state, action) => {
      state.status = 'Rejected';
      state.actionsCount++;
      state.error = action.payload;
    });
  },
});
export const { clearStatus } = articleSlice.actions;
export default articleSlice.reducer;
