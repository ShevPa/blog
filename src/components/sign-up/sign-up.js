import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cl from './sign-up.module.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, createUser } from '../store/authSlice';
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: 'onBlur' });
  const errorMessage = useSelector((state) => state.auth.error);
  const { status } = useSelector((state) => state.auth);
  const onSubmit = (data) => dispatch(createUser(data));
  useEffect(() => {
    dispatch(clearState());
  }, []);
  useEffect(() => {
    if (status === 'Completed') {
      navigate('/sign-in', { replace: true });
    }
  }, [status]);
  return (
    <div className={cl.signUp__wrapper}>
      <form className={cl.signUp__form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={cl.signUp__title}>Create new account</h2>
        <div className={cl.signUp__fields}>
          <label className={cl.signUp__label}>
            <span>Username</span>
            <input
              className={classNames(
                cl.signUp__input,
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
            {errorMessage?.username && (
              <span className={cl.error}>This username already taken</span>
            )}
          </label>
          <label className={cl.signUp__label}>
            <span>Email address</span>
            <input
              className={classNames(
                cl.signUp__input,
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
            {errorMessage?.email && (
              <span className={cl.error}>This email already taken</span>
            )}
          </label>
          <label className={cl.signUp__label}>
            <span>Password</span>
            <input
              className={classNames(
                cl.signUp__input,
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
              placeholder="Password"
            />
            {errors?.password && (
              <span className={cl.error}>{errors?.password.message}</span>
            )}
          </label>
          <label className={cl.signUp__label}>
            <span>Repeat password</span>
            <input
              className={classNames(
                cl.signUp__input,
                errors?.repeat ? cl.errorField : '',
              )}
              type="password"
              {...register('repeat', {
                required: 'This field is required',
                validate: (value) => {
                  return (
                    getValues('password') === value || 'Passwords must match'
                  );
                },
              })}
              autoComplete="off"
              placeholder="Repeat password"
            />
            {errors?.repeat && (
              <span className={cl.error}>{errors?.repeat.message}</span>
            )}
          </label>
        </div>
        <div className={cl.signUp__agreement}>
          <label className={cl.signUp__label}>
            <input
              className={cl.signUp__input}
              type="checkbox"
              {...register('agreement', {
                required: 'Should be checked',
              })}
            />
            <span className={classNames(errors.agreement ? cl.error : '')}>
              I agree to the processing of my personal information
            </span>
          </label>
        </div>
        <button className={cl.signUp__button} type="submit">
          Create
        </button>
        <p className={cl.signUp__text}>
          Already have an account?
          <Link to={'/sign-in'} className={cl.link}>
            <span> Sign In.</span>
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignUp;
