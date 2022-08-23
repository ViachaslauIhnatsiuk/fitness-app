import React, { FC } from 'react';
import { AiFillHome } from 'react-icons/ai';
import s from './NavButton.module.css';

const HomeButton: FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className={s.wrapper}>
      <AiFillHome className={isActive ? s.icon : s.icon_active} />
      <div className={isActive ? s.title : s.title_active}>Home</div>
      <div className={isActive ? s.line_active : s.line} />
    </div>
  );
};

export { HomeButton };
