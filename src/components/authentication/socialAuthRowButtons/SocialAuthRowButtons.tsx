import React, { FC } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSocialAuth } from '../../../hooks/useSocialAuth';
import { SocialAuthButton } from '../../UI/socialAuthButton/SocialAuthButton';
import s from './SocialAuthRowButtons.module.css';

const SocialAuthRowButtons: FC = () => {
  const { signInWithGoogle, signInWithFacebook } = useSocialAuth();

  return (
    <div className={s.wrapper}>
      <SocialAuthButton icon={<FcGoogle />} method={signInWithGoogle} />
      <SocialAuthButton
        style={{ color: '#2099ed' }}
        icon={<FaFacebook />}
        method={signInWithFacebook}
      />
    </div>
  );
};

export { SocialAuthRowButtons };
