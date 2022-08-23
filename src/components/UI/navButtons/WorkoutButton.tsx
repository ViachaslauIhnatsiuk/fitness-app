import React, { FC } from 'react';
import { TbBarbell } from 'react-icons/tb';
import s from './NavButton.module.css';

const WorkoutButton: FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className={s.wrapper}>
      <TbBarbell className={isActive ? s.icon : s.icon_active} />
      <div className={isActive ? s.title : s.title_active}>Workout</div>
      <div className={isActive ? s.line_active : s.line} />
    </div>
  );
};

export { WorkoutButton };
