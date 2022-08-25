import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePasswordReset } from '../../../hooks/usePasswordReset';
import { IUserForgotPassword } from './models';
import { emailRegister } from '../../../constants/formValidation';
import s from './ForgotPassword.module.css';

const ForgotPassword: FC = () => {
  const { resetPasswordError, handleForgotPassword } = usePasswordReset();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid }
  } = useForm<IUserForgotPassword>({ mode: 'onBlur' });

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Enter the email address associated with your Fit & Eat account</div>
      {resetPasswordError && (
        <div className={s.error}>We cannot find an account with that email address</div>
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
        <div className={s.buttons}>
          <Link to="/sign-in-with-password" className={s.button}>
            Go back
          </Link>
          <input
            className={s.button}
            style={{ backgroundColor: !isValid ? '#6b5bab' : '#7755ff' }}
            disabled={!isValid}
            type="submit"
            value="Continue"
            onClick={() => handleForgotPassword(getValues('email'))}
          />
        </div>
      </form>
    </div>
  );
};

export { ForgotPassword };
