import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { loadData } from '../store/articlesSlice';
import BlogHeader from '../blog-header/blog-header';
import ArticleList from '../article-list/article-list';
import Article from '../article/article';
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
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<Article />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
