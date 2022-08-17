import React, { FC } from 'react';
import { ReactComponent as Home } from '../../../assets/navigation/home.svg';
import s from './HomeButton.module.css';

const HomeButton: FC = () => {
  return (
    <div className={s.wrapper}>
      <Home className={s.icon} />
      <div className={s.title}>Home</div>
    </div>
  );
};

export { HomeButton };
