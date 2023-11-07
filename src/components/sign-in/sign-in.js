import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import cl from './sign-in.module.scss';
import classNames from 'classnames';
import { clearState, loginUser } from '../store/authSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.auth.error);
  const { status, user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (data) => dispatch(loginUser(data));

  useEffect(() => {
    dispatch(clearState());
  }, []);

  useEffect(() => {
    if (status === 'Completed') {
      localStorage.setItem('token', JSON.stringify(user.token));
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/', { replace: true });
    }
  }, [status]);
  return (
    <div className={cl.signIn__wrapper}>
      <form className={cl.signIn__form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={cl.signIn__title}>Sign in</h2>
        <div className={cl.signIn__fields}>
          <label className={cl.signIn__label}>
            <span>Email address</span>
            <input
              className={classNames(
                cl.signIn__input,
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
          <label className={cl.signIn__label}>
            <span>Password</span>
            <input
              className={classNames(
                cl.signIn__input,
                errors?.password ? cl.errorField : '',
              )}
              type="password"
              {...register('password', {
                required: 'This field is required',
              })}
              autoComplete="off"
              placeholder="Password"
            />
            {errors?.password && (
              <span className={cl.error}>{errors?.password.message}</span>
            )}
            {errorMessage && (
              <span className={cl.error}>Email or Password is incorrect</span>
            )}
          </label>
        </div>
        <button className={cl.signIn__button} type="submit">
          Login
        </button>
        <p className={cl.signIn__text}>
          Don&apos;t have an account?
          <Link to={'/sign-up'} className={cl.link}>
            <span> Sign Up.</span>
          </Link>
        </p>
      </form>
    </div>
  );
};
export default SignIn;
