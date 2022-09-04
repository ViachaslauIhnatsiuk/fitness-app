import React, { FC } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import { NutritionCardProps } from './models';
import { IConsumption } from '../../../models/Consumption';
import { setTitleCase } from '../../../helpers/setTitleCase';
import s from './MealNutritionCard.module.css';

const MealNutritionCard: FC<NutritionCardProps> = ({ title, curScore, maxScore, color }) => {
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
          bgColor={color}
          height="8px"
          labelColor="var(--font-pale)"
          labelSize="12px"
          labelAlignment="outside"
          width="100%"
          borderRadius="10px"
          baseBgColor="#e5e5e5"
        />
      </div>
    </div>
  );
};

export { MealNutritionCard };
