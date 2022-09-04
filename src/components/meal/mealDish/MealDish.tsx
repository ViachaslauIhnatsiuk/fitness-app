import React, { FC } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GiHotMeal } from 'react-icons/gi';
import { removeMeals } from '../../../store/slices/profileSlice';
import { useAppDispatch } from '../../../store/store';
import { MealDishProps } from './models';
import s from './MealDish.module.css';

const MealDish: FC<MealDishProps> = ({
  mealCardId,
  mealDishId,
  props: { name, serving_size_g, calories }
}) => {
  const dispatch = useAppDispatch();
  const handleRemoveDish = () => dispatch(removeMeals({ mealCardId, mealDishId }));

  return (
    <div className={s.wrapper}>
      <GiHotMeal className={s.icon} />
      <div className={s.info}>
        <div className={s.title}>Meal: {name}</div>
        <div className={s.calories}>Size: {serving_size_g} g</div>
        <div className={s.calories}>Calories: {calories} cal</div>
      </div>
      <AiFillDelete className={s.remove} onClick={handleRemoveDish} />
    </div>
  );
};

export { MealDish };
