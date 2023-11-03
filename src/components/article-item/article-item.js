import React from 'react';
import { format } from 'date-fns';
import classNames from 'classnames';
import cl from './article-item.module.scss';
import { Link } from 'react-router-dom';

const ArticleItem = ({
  title,
  slug,
  likeCount,
  tags,
  description,
  username,
  date,
  avatar,
  inside,
}) => {
  return (
    <div className={classNames(cl.article__item, inside ? cl.inside : '')}>
      <div className={cl.article__author}>
        <div className={cl.article__authorInfo}>
          <span className={cl.article__username}>{username}</span>
          <span className={cl.article__date}>
            {format(new Date(date), 'MMMM dd, yyyy')}
          </span>
        </div>
        <div className={cl.article__authorAvatar}>
          <img src={avatar} alt="avatar" />
        </div>
      </div>
      <div className={cl.article__header}>
        <Link to={`/articles/${slug}`} className={cl.article__title}>
          {title}
        </Link>
        <div className={cl.article__like}>
          <button type="button" className={cl.article__likeButton}></button>
          <span className={cl.article_likeCount}>{likeCount}</span>
        </div>
      </div>
      <div className={cl.article__tags}>
        {tags?.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className={cl.article__preview}>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default ArticleItem;
