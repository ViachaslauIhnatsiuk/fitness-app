import React, { FC } from 'react';
import { SocialAuthButtonProps } from './models';
import s from './SocialAuthButton.module.css';

const SocialAuthButton: FC<SocialAuthButtonProps> = ({ icon, method, title, style }) => {
  return (
    <button className={s.sign} type="button" onClick={method}>
      <div style={style} className={s.icon}>
        {icon}
      </div>
      {title && <span className={s.text}>{title}</span>}
    </button>
  );
};

export { SocialAuthButton };
