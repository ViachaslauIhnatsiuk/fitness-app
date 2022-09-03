import React, { FC } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { removeMeals } from '../../../store/slices/profileSlice';
import { useAppDispatch } from '../../../store/store';
import { MealDishProps } from './models';
import s from './MealDish.module.css';

const MealDish: FC<MealDishProps> = ({ props: { name, serving_size_g, calories }, title }) => {
  const dispatch = useAppDispatch();
  const handleRemoveDish = () =>
    dispatch(removeMeals({ mealTitle: title, dishNameForRemoval: name }));

  return (
    <div className={s.wrapper}>
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
