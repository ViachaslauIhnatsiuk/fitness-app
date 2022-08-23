import React, { FC } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import s from './NavButton.module.css';

const ProfileButton: FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className={s.wrapper}>
      <BsFillPersonFill className={isActive ? s.icon : s.icon_active} />
      <div className={isActive ? s.title : s.title_active}>Profile</div>
      <div className={isActive ? s.line_active : s.line} />
    </div>
  );
};

export { ProfileButton };
