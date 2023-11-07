import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice';
import articleReducer from './articleSlice';
import authReduser from './authSlice';
import userReduser from './userSlice';

export default configureStore({
  reducer: {
    articles: articlesReducer,
    article: articleReducer,
    auth: authReduser,
    user: userReduser,
  },
});
