import React, { FC } from 'react';
import { NutritionCardProps } from './models';
import s from './MealNutritionCard.module.css';
import { IConsumption } from '../../../models/Consumption';
import { setTitleCase } from '../../../helpers/setTitleCase';

const MealNutritionCard: FC<NutritionCardProps> = ({ title, curScore, maxScore }) => {
  const currentValue = curScore[title as keyof IConsumption];
  const maxValue = maxScore[title as keyof IConsumption];

  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <div className={s.title}>{setTitleCase(title)}</div>
        <div className={s.amount}>
          {currentValue} / {maxValue}
        </div>
      </div>
      <div className={s.progress} />
    </div>
  );
};

export { MealNutritionCard };
