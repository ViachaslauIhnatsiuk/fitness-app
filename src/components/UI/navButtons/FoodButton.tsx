import React, { FC } from 'react';
import { IoFastFood } from 'react-icons/io5';
import s from './NavButton.module.css';

const FoodButton: FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className={s.wrapper}>
      <IoFastFood className={isActive ? s.icon : s.icon_active} />
      <div className={isActive ? s.title : s.title_active}>Food</div>
      <div className={isActive ? s.line_active : s.line} />
    </div>
  );
};

export { FoodButton };
