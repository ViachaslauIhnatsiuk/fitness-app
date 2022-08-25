import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { RememberMe } from '../../UI/rememberMe/RememberMe';
import { IUserAuth } from './models';
import { emailRegister, passwordRegister } from '../../../constants/formValidation';
import { SocialAuthRowButtons } from '../socialAuthRowButtons/SocialAuthRowButtons';
import { Separator } from '../../UI/separator/Separator';
import s from './PasswordAuthentication.module.css';

const PasswordAuthentication: FC = () => {
  const { loginError, handleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid }
  } = useForm<IUserAuth>({ mode: 'onBlur' });

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Login to your Account</div>
      {loginError && (
        <div className={s.error}>
          We cannot find an account with that email address and password
        </div>
      )}
      <form className={s.form} onSubmit={handleSubmit(() => reset())}>
        <div className={s.field}>
          <input
            autoComplete="off"
            className={s.input}
            placeholder="E-mail"
            type="email"
            {...register('email', emailRegister)}
          />
          <p className={s.warning}>{errors.email?.message}</p>
        </div>
        <div className={s.field}>
          <input
            className={s.input}
            placeholder="Password"
            type="password"
            {...register('password', passwordRegister)}
          />
          <p className={s.warning}>{errors.password?.message}</p>
        </div>
        <RememberMe />
        <input
          className={s.button}
          style={{ backgroundColor: !isValid ? '#6b5bab' : '#7755ff' }}
          disabled={!isValid}
          type="submit"
          value="Sign in"
          onClick={() => handleLogin(...getValues(['email', 'password']))}
        />
      </form>
      <Link to="/forgot-password" className={s.forgot}>
        Forgot the password?
      </Link>
      <Separator text="or continue with" />
      <SocialAuthRowButtons />
    </div>
  );
};

export { PasswordAuthentication };
