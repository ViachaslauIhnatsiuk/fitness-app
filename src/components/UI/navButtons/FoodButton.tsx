import React, { FC } from 'react';
import { GiMeal } from 'react-icons/gi';
import s from './NavButton.module.css';

const FoodButton: FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className={s.wrapper}>
      <GiMeal className={isActive ? s.icon : s.icon_active} />
      <div className={isActive ? s.title : s.title_active}>Food</div>
      <div className={isActive ? s.line_active : s.line} />
    </div>
  );
};

export { FoodButton };
