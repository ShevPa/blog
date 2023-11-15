import React, { useEffect } from 'react';
import cl from './edit-article.module.scss';
import ArticleForm from '../article-form/article-form';
import { loadArticle, updateArticle } from '../store/articleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { article, status } = useSelector((state) => state.article);
  useEffect(() => {
    dispatch(loadArticle(slug));
  }, [slug]);
  useEffect(() => {
    status === 'Completed' ? navigate('/') : null;
  }, [status]);

  return (
    <div className={cl.editArticle__wrapper}>
      <div className={cl.editArticle__container}>
        <h2 className={cl.editArticle__title}>Edit article</h2>
        {status === 'completed' ? (
          <ArticleForm onSubmit={updateArticle} article={article} />
        ) : null}
      </div>
    </div>
  );
};
export default EditArticle;
