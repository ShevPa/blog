import React from 'react';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import cl from './article-item.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteArticle, toggleLike } from '../store/articleSlice';

const ArticleItem = ({
  title,
  slug,
  likeCount,
  tags,
  description,
  username,
  date,
  avatar,
  favorited,
  inside,
  isOwner,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLike = () => {
    if (localStorage.getItem('token')) {
      dispatch(toggleLike({ favorited, slug }));
    }
  };
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
      {isOwner && (
        <div className={cl.article__control}>
          <Popconfirm
            description={'Are you sure to delete this article?'}
            okText={'Yes'}
            cancelText={'No'}
            onConfirm={() => dispatch(deleteArticle(slug))}
            placement="right"
          >
            <button className={cl.article__delete}>Delete</button>
          </Popconfirm>
          <button
            className={cl.article__edit}
            onClick={() => navigate(`/articles/${slug}/edit`)}
          >
            Edit
          </button>
        </div>
      )}
      <div className={cl.article__header}>
        <Link to={`/articles/${slug}`} className={cl.article__title}>
          {title}
        </Link>
        <div className={cl.article__like}>
          <button
            type="button"
            className={classNames(
              cl.article__likeButton,
              favorited ? cl.article__likeButton_active : '',
            )}
            onClick={onLike}
          ></button>
          <span className={cl.article_likeCount}>{likeCount}</span>
        </div>
      </div>
      <div className={cl.article__tags}>
        {tags?.map((tag) => (
          <span key={uuidv4()}>{tag}</span>
        ))}
      </div>
      <div className={cl.article__preview}>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default ArticleItem;
