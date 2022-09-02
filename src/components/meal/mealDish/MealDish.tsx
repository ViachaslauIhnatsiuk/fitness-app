import React, { FC } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { removeMeals } from '../../../store/slices/profileSlice';
import { useAppDispatch } from '../../../store/store';
import s from './MealDish.module.css';
import { MealDishProps } from './models';

const MealDish: FC<MealDishProps> = ({ props, title }) => {
  const dispatch = useAppDispatch();
  const handleRemoveDish = () =>
    dispatch(removeMeals({ mealTitle: title, dishNameForRemoval: props.name }));

  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <div className={s.title}>{props.name}</div>
        <div className={s.calories}>{props.calories} calories</div>
        <div className={s.calories}>{props.protein_g} g protein</div>
      </div>
      <IoTrashOutline className={s.remove} onClick={handleRemoveDish} />
    </div>
  );
};

export { MealDish };
