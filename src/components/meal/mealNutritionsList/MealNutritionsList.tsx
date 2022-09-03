import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getConsumption } from '../../../helpers/getConsumption';
import { getConsumptionRate } from '../../../helpers/getConsumptionRate';
import { dateToday } from '../../../helpers/transformDate';
import { useAppSelector } from '../../../store/model';
import { selectUserData, selectUserMeals } from '../../../store/selectors';
import { MealNutritionCard } from '../mealNutrition/MealNutritionCard';
import { cardTitles } from './constants';
import s from './MealNutritionsList.module.css';

const MealNutritionsList: FC = () => {
  const { gender, weight, height, age, goal } = useAppSelector(selectUserData);
  const maxScore = getConsumptionRate(gender, weight, height, age, goal);

  const userMeals = useAppSelector(selectUserMeals);
  const todayMeals = userMeals.filter((meal) => meal.date === dateToday);
  const meals = todayMeals.map((item) => item.meals).flat();

  const curScore = getConsumption(meals);

  return (
    <div className={s.wrapper}>
      {cardTitles.map((cardTitle) => (
        <MealNutritionCard
          title={cardTitle.title}
          color={cardTitle.color}
          curScore={curScore}
          maxScore={maxScore}
          key={uuidv4()}
        />
      ))}
    </div>
  );
};

export { MealNutritionsList };
