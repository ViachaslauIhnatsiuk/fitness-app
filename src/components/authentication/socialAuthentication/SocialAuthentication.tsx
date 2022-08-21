import React, { FC } from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useSocialAuth } from '../../../hooks/useSocialAuth';
import s from './SocialAuthentication.module.css';

const SocialAuthentication: FC = () => {
  const { signInWithGoogle, signInWithFacebook, signInWithTwitter } = useSocialAuth();

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Let`s you in</div>
      <div className={s.social}>
        <button className={s.sign} type="button" onClick={signInWithGoogle}>
          <FcGoogle className={s.google} />
          <span>Continue with Google</span>
        </button>
        <button className={s.sign} type="button" onClick={signInWithFacebook}>
          <FaFacebook className={s.facebook} />
          <span>Continue with Facebook</span>
        </button>
        <button className={s.sign} type="button" onClick={signInWithTwitter}>
          <FaTwitter className={s.twitter} />
          <span>Continue with Twitter</span>
        </button>
      </div>
      <div className={s.separator}>
        <div className={s.or}>or</div>
      </div>
      <button className={s.button} type="button">
        Sign in with password
      </button>
    </div>
  );
};

export { SocialAuthentication };
