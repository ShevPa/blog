import React from 'react';
import cl from './blog-header.module.scss';
import { Outlet, Link, useNavigate } from 'react-router-dom';
const BlogHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  return (
    <>
      <div className={cl.header__wrapper}>
        <Link to={'/articles'} className={cl.header__title}>
          Realworld Blog
        </Link>
        {localStorage?.getItem('token') ? (
          <div className={cl.header__withAuth}>
            <Link to={'/new-article'} className={cl.header__link}>
              <button className={cl.header__createArticle}>
                Create article
              </button>
            </Link>

            <Link to={'/profile'} className={cl.header__profile}>
              <p className={cl.header__username}>{user.username}</p>
              <div className={cl.header__image}>
                <img
                  src={
                    user?.image ? user.image : 'https://i.imgur.com/mD71SmE.png'
                  }
                  alt="avatar"
                />
              </div>
            </Link>

            <button
              className={cl.header__logOut}
              onClick={() => {
                localStorage.clear();
                navigate('/articles');
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div>
            <Link to={'/sign-in'} className={cl.header__link}>
              <button type="button" className={cl.header__signIn}>
                Sign In
              </button>
            </Link>
            <Link to={'/sign-up'} className={cl.header__link}>
              <button type="button" className={cl.header__signUp}>
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};
export default BlogHeader;
