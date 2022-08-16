import React, { FC } from 'react';
import s from './ProfileButton.module.css';
import { ReactComponent as Profile } from '../../../assets/navigation/profile.svg';

const ProfileButton: FC = () => {
  return (
    <div className={s.wrapper}>
      <Profile className={s.icon} />
      <div className={s.title}>Profile</div>
    </div>
  );
};

export { ProfileButton };
