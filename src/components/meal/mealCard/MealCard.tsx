import React, { FC } from 'react';
import { MealDish } from '../mealDish/MealDish';
import { MealCardProps } from './models';
import s from './MealCard.module.css';

const MealCard: FC<MealCardProps> = ({ title }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.title}>{title}</div>
        <div className={s.info}>
          <div className={s.meals}>3 meals</div>
          <div className={s.calories}>240 calories</div>
        </div>
      </div>
      <MealDish />
      <MealDish />
      <MealDish />
    </div>
  );
};

export { MealCard };
