import React, { FC } from 'react';
import { ProfileMain } from '../../components/profileMain/ProfileMain';
import s from './Profile.module.css';

const Profile: FC = () => {
  return (
    <div className={s.wrapper}>
      <ProfileMain />
    </div>
  );
};

export { Profile };
