import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { SocialAuthColumnButtons } from '../socialAuthColumnButtons/SocialAuthColumnButtons';
import { Separator } from '../../UI/separator/Separator';
import s from './SocialAuthentication.module.css';

const SocialAuthentication: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>Let`s you in</div>
      <SocialAuthColumnButtons />
      <Separator text="or" />
      <Link to="/sign-in-with-password" className={s.button}>
        Sign in with password
      </Link>
      <div className={s.no_account}>
        Don&apos;t have an account?&nbsp;
        <Link to="/sign-up" className={s.sign_up}>
          Sing up
        </Link>
      </div>
    </div>
  );
};

export { SocialAuthentication };
