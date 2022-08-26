import React, { FC } from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSocialAuth } from '../../../hooks/useSocialAuth';
import { SocialAuthButton } from '../../UI/socialAuthButton/SocialAuthButton';
import s from './SocialAuthColumnButtons.module.css';

const SocialAuthColumnButtons: FC = () => {
  const { signInWithGoogle, signInWithFacebook, signInWithTwitter } = useSocialAuth();

  return (
    <div className={s.wrapper}>
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
      <SocialAuthButton
        style={{ color: '#1da1f2' }}
        icon={<FaTwitter />}
        method={signInWithTwitter}
        title="Continue with Twitter"
      />
    </div>
  );
};

export { SocialAuthColumnButtons };
