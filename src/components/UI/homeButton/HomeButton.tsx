import React, { FC } from 'react';
import { AiFillHome } from 'react-icons/ai';
import s from './HomeButton.module.css';

const HomeButton: FC = () => {
  return (
    <div className={s.wrapper}>
      <h3 className={s.icon}>
        <AiFillHome />
      </h3>
      <div className={s.title}>Home</div>
    </div>
  );
};

export { HomeButton };
