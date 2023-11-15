import React, { useEffect } from 'react';
import cl from './article-form.module.scss';
import { useFieldArray, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearStatus } from '../store/articleSlice';

const ArticleForm = ({ onSubmit, article }) => {
  const tagList = article?.tagList.map((item) => ({
    name: item,
  }));
  const { slug } = useParams();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      text: article?.body || '',
      tag: tagList || '',
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'tag' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.article);
  useEffect(() => {
    if (status === 'Completed') {
      dispatch(clearStatus());
      navigate('/', { replace: true });
    }
  }, [status]);
  const onSubmitFunction = (data) => {
    const dataRes = { ...data, slug };
    dispatch(onSubmit(dataRes));
  };
  return (
    <form onSubmit={handleSubmit(onSubmitFunction)} className={cl.articleForm}>
      <label className={cl.articleForm__label}>
        <span>Title</span>
        <input
          {...register('title', {
            required: 'This field is required',
          })}
          className={classNames(
            cl.articleForm__input,
            errors?.title ? cl.errorField : '',
          )}
          placeholder="Title"
        />
        {errors?.title && (
          <span className={cl.errorMessage}>{errors?.title.message}</span>
        )}
      </label>
      <label className={cl.articleForm__label}>
        <span>Short description</span>
        <input
          {...register('description', {
            required: 'This field is required',
          })}
          className={classNames(
            cl.articleForm__input,
            errors?.description ? cl.errorField : '',
          )}
          placeholder="Description"
        />
        {errors?.description && (
          <span className={cl.errorMessage}>{errors?.description.message}</span>
        )}
      </label>
      <label className={cl.articleForm__label}>
        <span>Text</span>
        <textarea
          {...register('text', {
            required: 'This field is required',
          })}
          className={classNames(
            cl.articleForm__textarea,
            errors?.text ? cl.errorField : '',
          )}
          placeholder="Text"
        ></textarea>
        {errors?.text && (
          <span className={cl.errorMessage}>{errors?.text.message}</span>
        )}
      </label>
      <div className={cl.articleForm__tags}>
        <span>Tags</span>
        <div className={cl.articleForm__tagContainer}>
          <div className={cl.articleForm__tagList}>
            {fields.map((field, index) => (
              <div className={cl.articleForm__tagItem} key={field.id}>
                <input
                  className={classNames(
                    cl.articleForm__input,
                    errors?.tag?.[index]?.name ? cl.errorField : '',
                  )}
                  {...register(`tag.${index}.name`, {
                    required:
                      'These fields should be filled in, delete them if you dont need them',
                  })}
                />
                <button
                  type="button"
                  className={cl.deleteButton}
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={cl.addButton}
            onClick={() => {
              append({
                name: '',
              });
            }}
          >
            Add tag
          </button>
        </div>
      </div>
      <button type="submit" className={cl.articleForm__button}>
        Send
      </button>
    </form>
  );
};
export default ArticleForm;
