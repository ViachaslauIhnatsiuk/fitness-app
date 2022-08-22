import React, { FC } from 'react';
import { RecipeProps } from './models';
import s from './Recipe.module.css';

const Recipe: FC<RecipeProps> = ({ data: { image, label, dishType, calories } }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.image_wrapper}>
        <img src={image} className={s.image} alt={label} />
      </div>
      <div className={s.overlay}>
        <span className={s.label}>{label}</span>
        <span className={s.label}>Type: {dishType}</span>
        <span className={s.label}>Calories: {calories.toFixed(1)} cal</span>
      </div>
    </div>
  );
};

export { Recipe };
