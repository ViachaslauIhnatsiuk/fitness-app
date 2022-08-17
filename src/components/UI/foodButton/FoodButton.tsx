import React, { FC } from 'react';
import { IoFastFood } from 'react-icons/io5';
import s from './FoodButton.module.css';

const FoodButton: FC = () => {
  return (
    <div className={s.wrapper}>
      <h3 className={s.icon}>
        <IoFastFood />
      </h3>
      <div className={s.title}>Food</div>
    </div>
  );
};

export { FoodButton };
