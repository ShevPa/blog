import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { loadData } from '../store/articlesSlice';
import BlogHeader from '../blog-header/blog-header';
import ArticleList from '../article-list/article-list';
import Article from '../article/article';
import SignUp from '../sign-up/sign-up';
import SignIn from '../sign-in/sign-in';
import Profile from '../profile/profile';
const App = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.articles);
  useEffect(() => {
    dispatch(loadData(currentPage));
  }, [currentPage, dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogHeader />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<Navigate to="/" replace />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
