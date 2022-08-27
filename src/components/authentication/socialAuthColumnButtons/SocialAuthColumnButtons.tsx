import React, { FC } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSocialAuth } from '../../../hooks/useSocialAuth';
import { SocialAuthButton } from '../../UI/socialAuthButton/SocialAuthButton';
import { Notification } from '../../UI/notification/Notification';
import { NotificationMessage } from '../../../models/notifications';
import s from './SocialAuthColumnButtons.module.css';

const SocialAuthColumnButtons: FC = () => {
  const { socialAuthError, setSocialAuthError, signInWithGoogle, signInWithFacebook } =
    useSocialAuth();

  return (
    <div className={s.wrapper}>
      {socialAuthError && (
        <Notification text={NotificationMessage.authWarning} handler={setSocialAuthError} />
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
