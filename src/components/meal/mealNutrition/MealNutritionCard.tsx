import React, { FC } from 'react';
import { NutritionCardProps } from './models';
import s from './MealNutritionCard.module.css';

const MealNutritionCard: FC<NutritionCardProps> = ({ title }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <div className={s.title}>{title}</div>
        <div className={s.amount}>320</div>
      </div>
      <div className={s.progress} />
    </div>
  );
};

export { MealNutritionCard };
