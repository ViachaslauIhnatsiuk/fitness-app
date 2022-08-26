import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { usePasswordReset } from '../../../hooks/usePasswordReset';
import { IUserForgotPassword } from './models';
import { EmailInput } from '../../UI/emailInput/EmailInput';
import { ForgotSubmitButton } from '../../UI/submitButtons/forgotSubmitButton/ForgotSubmitButton';
import s from './ForgotPassword.module.css';

const ForgotPassword: FC = () => {
  const { success, resetPasswordError, handleForgotPassword } = usePasswordReset();
  const methods = useForm<IUserForgotPassword>({ mode: 'onBlur' });
  const { handleSubmit, reset } = methods;

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Enter the email address associated with your Fit & Eat account</div>
      {resetPasswordError && (
        <div className={s.error}>We cannot find an account with that email address</div>
      )}
      {success && (
        <div className={s.error}>
          We have sent a link for changing password to your email. Please check it, then go back and
          try to authenticate
        </div>
      )}
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit(() => reset())}>
          <EmailInput />
          <ForgotSubmitButton
            path="/sign-in-with-password"
            value="Continue"
            handler={handleForgotPassword}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export { ForgotPassword };
