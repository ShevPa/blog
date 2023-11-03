import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { loadArticle } from '../store/articleSlice';
import ArticleItem from '../article-item/article-item';
import cl from './article.module.scss';
const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadArticle(slug));
  }, [dispatch, slug]);
  const { article, status, error } = useSelector((state) => state.article);
  console.log(status);
  return (
    <div className={cl.articleCard}>
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>Error: {error}</h2>}
      {status === 'completed' && (
        <div className={cl.articleCard__wrapper}>
          <ArticleItem
            title={article.title}
            slug={article.slug}
            likeCount={article.favoritesCount}
            tags={article.tagList}
            description={article.description}
            username={article.author.username}
            date={article.createdAt}
            avatar={article.author.image}
            inside={true}
          />
          <Markdown>{article.body}</Markdown>
        </div>
      )}
    </div>
  );
};
export default Article;
