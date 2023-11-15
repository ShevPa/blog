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
import NewArticle from '../new-article/new-article';
import PrivateAuth from '../hoc/privateAuth';
import EditArticle from '../edit-article/edit-article';
const App = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.articles);
  const { actionsCount } = useSelector((state) => state.article);
  useEffect(() => {
    dispatch(loadData(currentPage));
  }, [currentPage, dispatch, actionsCount]);
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogHeader />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<Navigate to="/" replace />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route
            path="articles/:slug/edit"
            element={
              <PrivateAuth>
                <EditArticle />
              </PrivateAuth>
            }
          />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route
            path="profile"
            element={
              <PrivateAuth>
                <Profile />
              </PrivateAuth>
            }
          />
          <Route
            path="new-article"
            element={
              <PrivateAuth>
                <NewArticle />
              </PrivateAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
