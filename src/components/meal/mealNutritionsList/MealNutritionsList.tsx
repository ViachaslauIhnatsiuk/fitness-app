import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MealNutritionCard } from '../mealNutrition/MealNutritionCard';
import { cardTitles } from './constants';
import s from './MealNutritionsList.module.css';

const MealNutritionsList: FC = () => {
  return (
    <div className={s.wrapper}>
      {cardTitles.map((cardTitle) => (
        <MealNutritionCard title={cardTitle} key={uuidv4()} />
      ))}
    </div>
  );
};

export { MealNutritionsList };
