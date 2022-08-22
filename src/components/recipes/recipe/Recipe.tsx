import React from 'react';
import { Recipe } from '../../../store/model';
import s from './Recipe.module.css';

interface Props {
  data: Recipe;
}

const RecipeItem = ({ data: { image, label, dishType, calories } }: Props) => {
  return (
    <div className={s.recipe}>
      <div className={s.recipe_image_wrapper}>
        <img src={image} className={s.recipe_image} alt={label} />
      </div>
      <div className={s.recipe_overlay}>
        <span className={s.recipe_label}>{label}</span>
        <span className={s.recipe_label}>Type: {dishType}</span>
        <span className={s.recipe_label}>Calories: {calories.toFixed(1)} cal</span>
      </div>
    </div>
  );
};

export { RecipeItem };
