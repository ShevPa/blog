import React, { useEffect } from 'react';
import cl from './profile.module.scss';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, updateUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, user } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    dispatch(updateUser(data));
    console.log(data);
  };
  useEffect(() => {
    if (status === 'Completed') {
      localStorage.clear();
      localStorage.setItem('token', JSON.stringify(user.token));
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(clearState());
      navigate('/', { replace: true });
    }
  }, [status]);
  return (
    <div className={cl.profile__wrapper}>
      <form className={cl.profile__form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={cl.profile__title}>Edit Profile</h2>
        <div className={cl.profile__fields}>
          <label className={cl.profile__label}>
            <span>Username</span>
            <input
              className={classNames(
                cl.profile__input,
                errors?.username ? cl.errorField : '',
              )}
              type="text"
              {...register('username', {
                required: 'This field is required',
                minLength: {
                  value: 3,
                  message: 'The minimum length is 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'The maximum length is 20 characters',
                },
              })}
              autoComplete="off"
              placeholder="Username"
            />
            {errors?.username && (
              <span className={cl.error}>{errors?.username.message}</span>
            )}
          </label>
          <label className={cl.profile__label}>
            <span>Email address</span>
            <input
              className={classNames(
                cl.profile__input,
                errors?.email ? cl.errorField : '',
              )}
              type="email"
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
                  message: 'This is incorrect email',
                },
              })}
              autoComplete="off"
              placeholder="Email address"
            />
            {errors?.email && (
              <span className={cl.error}>{errors?.email.message}</span>
            )}
          </label>
          <label className={cl.profile__label}>
            <span>New password</span>
            <input
              className={classNames(
                cl.profile__input,
                errors?.password ? cl.errorField : '',
              )}
              type="password"
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 6,
                  message: 'The minimum length is 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'The maximum length is 40 characters',
                },
              })}
              autoComplete="off"
              placeholder="New password"
            />
            {errors?.password && (
              <span className={cl.error}>{errors?.password.message}</span>
            )}
          </label>
          <label className={cl.profile__label}>
            <span>Avatar image (url)</span>
            <input
              className={classNames(
                cl.profile__input,
                errors?.image ? cl.errorField : '',
              )}
              type="url"
              {...register('image', {
                required: 'This field is required',
              })}
              autoComplete="off"
              placeholder="Avatar image"
            />
            {errors?.image && (
              <span className={cl.error}>{errors?.image.message}</span>
            )}
          </label>
          <button className={cl.profile__button} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
