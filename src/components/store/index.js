import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
import articleReducer from './articleSlice';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
  },
});
