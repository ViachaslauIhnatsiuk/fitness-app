import React, { FC } from 'react';
import { MealList } from './mealList/MealList';
import { MealNutritionsList } from './mealNutritionsList/MealNutritionsList';
import s from './Meal.module.css';

const Meal: FC = () => {
  return (
    <div className={s.wrapper}>
      <MealList />
      <MealNutritionsList />
    </div>
  );
};

export { Meal };
