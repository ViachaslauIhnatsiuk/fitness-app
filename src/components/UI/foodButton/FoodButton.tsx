import React, { FC } from 'react';
import s from './FoodButton.module.css';
import { ReactComponent as Food } from '../../../assets/navigation/food.svg';

const FoodButton: FC = () => {
  return (
    <div className={s.wrapper}>
      <Food className={s.icon} />
      <div className={s.title}>Food</div>
    </div>
  );
};

export { FoodButton };
