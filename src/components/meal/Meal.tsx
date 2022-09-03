import React, { FC } from 'react';
import { MealList } from './mealList/MealList';
import { MealNutritionsList } from './mealNutritionsList/MealNutritionsList';
import s from './Meal.module.css';
import { NewMealCard } from './newMealCard/NewMealCard';

const Meal: FC = () => {
  return (
    <div className={s.wrapper}>
      <NewMealCard />
      <MealList />
      <MealNutritionsList />
    </div>
  );
};

export { Meal };
