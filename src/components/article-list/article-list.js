import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import cl from './article-list.module.scss';
import ArticleItem from '../article-item/article-item';
import PaginationArticles from '../pagination-articles/pagination-articles';

const ArticleList = () => {
  const { status, error } = useSelector((state) => state.articles);
  const articlesList = useSelector((state) => state.articles.articles);

  return (
    <div className={cl.article__list}>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>Error: {error}</h2>}
      {articlesList?.map((item) => (
        <ArticleItem
          key={uuidv4()}
          title={item.title}
          slug={item.slug}
          likeCount={item.favoritesCount}
          tags={item.tagList}
          description={item.description}
          username={item.author.username}
          date={item.createdAt}
          avatar={item.author.image}
          inside={false}
        />
      ))}
      {status === 'completed' && <PaginationArticles />}
    </div>
  );
};
export default ArticleList;
