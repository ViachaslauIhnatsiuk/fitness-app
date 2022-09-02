import React, { FC } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { NutritionCardProps } from './models';
import s from './MealNutritionCard.module.css';
import { IConsumption } from '../../../models/Consumption';
import { setTitleCase } from '../../../helpers/setTitleCase';

const MealNutritionCard: FC<NutritionCardProps> = ({ title, curScore, maxScore }) => {
  const currentValue = curScore[title as keyof IConsumption];
  const maxValue = maxScore[title as keyof IConsumption];
  const percentCompleted = Math.round((currentValue / maxValue) * 100);

  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <div className={s.title}>{setTitleCase(title)}</div>
        <div className={s.amount}>
          {currentValue} / {maxValue}
        </div>
      </div>
      <div className={s.progress}>
        <ProgressBar
          completed={percentCompleted}
          bgColor="#7755ff"
          height="8px"
          width="100%"
          borderRadius="10px"
          baseBgColor="#e5e5e5"
        />
      </div>
    </div>
  );
};

export { MealNutritionCard };
