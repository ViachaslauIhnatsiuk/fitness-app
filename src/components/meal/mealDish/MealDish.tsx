import React, { FC } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { removeMeals } from '../../../store/slices/profileSlice';
import { useAppDispatch } from '../../../store/store';
import s from './MealDish.module.css';
import { MealDishProps } from './models';

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
      <IoTrashOutline className={s.remove} onClick={handleRemoveDish} />
    </div>
  );
};

export { MealDish };
