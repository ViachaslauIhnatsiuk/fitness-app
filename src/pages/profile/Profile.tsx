import React, { FC } from 'react';
import s from './Profile.module.css';
import { RegistrationDataPage } from '../registrationDataPage/RegistrationDataPage';

const Profile: FC = () => {
  return (
    <div className={s.wrapper}>
      <RegistrationDataPage />
    </div>
  );
};

export { Profile };
