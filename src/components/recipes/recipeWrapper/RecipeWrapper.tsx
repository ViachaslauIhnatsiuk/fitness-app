import React, { FC } from 'react';
import { Recipe } from '../recipe/Recipe';
import s from './RecipeWrapper.module.css';

const RecipeWrapper: FC = () => {
  return (
    <div className={s.wrapper}>
      <Recipe />
    </div>
  );
};

export { RecipeWrapper };
