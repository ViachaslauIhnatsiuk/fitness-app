import React, { FC } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';
import { useSocialAuth } from '../../../hooks/useSocialAuth';
import { SocialAuthButton } from '../../UI/socialAuthButton/SocialAuthButton';
import s from './SocialAuthColumnButtons.module.css';

const SocialAuthColumnButtons: FC = () => {
  const { socialAuthError, setSocialAuthError, signInWithGoogle, signInWithFacebook } =
    useSocialAuth();

  return (
    <div className={s.wrapper}>
      {socialAuthError && (
        <div className={s.notification}>
          <div className={s.text}>
            Account with the email you are using already exists. Try to log in with a previously
            used account
          </div>
          <IoMdClose className={s.close} onClick={() => setSocialAuthError(false)} />
        </div>
      )}
      <SocialAuthButton
        icon={<FcGoogle />}
        method={signInWithGoogle}
        title="Continue with Google"
      />
      <SocialAuthButton
        style={{ color: '#2099ed' }}
        icon={<FaFacebook />}
        method={signInWithFacebook}
        title="Continue with Facebook"
      />
    </div>
  );
};

export { SocialAuthColumnButtons };
