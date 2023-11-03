import React from 'react';
import cl from './blog-header.module.scss';
import { Outlet, Link } from 'react-router-dom';
const BlogHeader = () => {
  return (
    <>
      <div className={cl.header__wrapper}>
        <Link to={'/articles'} className={cl.header__title}>
          Realworld Blog
        </Link>
        <button type="button" className={cl.header__signIn}>
          Sign In
        </button>
        <button type="button" className={cl.header__signUp}>
          Sign Up
        </button>
      </div>
      <Outlet />
    </>
  );
};
export default BlogHeader;
