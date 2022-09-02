import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { SocialAuthColumnButtons } from '../socialAuthColumnButtons/SocialAuthColumnButtons';
import { Separator } from '../../UI/separator/Separator';
import { AccountExistance } from '../../UI/accountExistance/AccountExistance';
import { SignLinkTitle, SignLink } from '../../../models/CrossSignLinks';
import s from './SocialAuthentication.module.css';

const SocialAuthentication: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <div className={s.title}>Let`s you in</div>
        <SocialAuthColumnButtons />
        <Separator text="or" />
        <Link to="/sign-in-with-password" className={s.button}>
          Sign in with password
        </Link>
        <AccountExistance title={SignLinkTitle.noAccount} path="sign-up" link={SignLink.signUp} />
      </div>
    </div>
  );
};

export { SocialAuthentication };
