import React, { FC } from 'react';
import { CgProfile } from 'react-icons/cg';
import s from './ProfileButton.module.css';

const ProfileButton: FC = () => {
  return (
    <div className={s.wrapper}>
      <h3 className={s.icon}>
        <CgProfile />
      </h3>
      <div className={s.title}>Profile</div>
    </div>
  );
};

export { ProfileButton };
