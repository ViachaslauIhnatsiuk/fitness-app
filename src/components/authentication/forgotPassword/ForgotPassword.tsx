import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useResetPassword } from '../../../hooks/useResetPassword';
import { IUserForgotPassword } from './models';
import { emailRegister } from '../../../constants/formValidation';
import s from './ForgotPassword.module.css';

const ForgotPassword: FC = () => {
  const { resetPasswordError, handleForgotPassword } = useResetPassword();
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
            type="email"
            {...register('email', emailRegister)}
          />
          <p className={s.warning}>{errors.email?.message}</p>
        </div>
        <input
          className={s.button}
          style={{ backgroundColor: !isValid ? '#35383f' : '#7755ff' }}
          disabled={!isValid}
          type="submit"
          value="Continue"
          onClick={() => handleForgotPassword(getValues('email'))}
        />
      </form>
    </div>
  );
};

export { ForgotPassword };
