import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { EmailInput } from '../../UI/emailInput/EmailInput';
import { PasswordInput } from '../../UI/passwordInput/PasswordInput';
import { AuthSubmitButton } from '../../UI/submitButtons/authSubmitButton/AuthSubmitButton';
import { RememberMe } from '../../UI/rememberMe/RememberMe';
import { IUserAuth } from './models';
import { SocialAuthRowButtons } from '../socialAuthRowButtons/SocialAuthRowButtons';
import { Separator } from '../../UI/separator/Separator';
import { AccountExistance } from '../../UI/accountExistance/AccountExistance';
import { SignLinkTitle, SignLink } from '../../../models/CrossSignLinks';
import s from './PasswordAuthentication.module.css';

const PasswordAuthentication: FC = () => {
  const { loginError, handleLogin } = useAuth();
  const methods = useForm<IUserAuth>({ mode: 'onBlur' });
  const { handleSubmit, reset } = methods;

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Login to your Account</div>
      {loginError && (
        <div className={s.error}>
          We cannot find an account with that email address and password
        </div>
      )}
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit(() => reset())}>
          <EmailInput />
          <PasswordInput />
          <RememberMe />
          <AuthSubmitButton path="" value="Continue" handler={handleLogin} />
        </form>
      </FormProvider>
      <Link to="/forgot-password" className={s.forgot}>
        Forgot the password?
      </Link>
      <Separator text="or continue with" />
      <SocialAuthRowButtons />
      <AccountExistance title={SignLinkTitle.noAccount} path="sign-up" link={SignLink.signUp} />
    </div>
  );
};

export { PasswordAuthentication };
