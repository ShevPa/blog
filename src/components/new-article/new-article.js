import React from 'react';
import cl from './new-article.module.scss';
import ArticleForm from '../article-form/article-form';
import { createArticle } from '../store/articleSlice';

const NewArticle = () => {
  return (
    <div className={cl.newArticle__wrapper}>
      <div className={cl.newArticle__container}>
        <h2 className={cl.newArticle__title}>Create new article</h2>
        <ArticleForm onSubmit={createArticle} />
      </div>
    </div>
  );
};
export default NewArticle;
