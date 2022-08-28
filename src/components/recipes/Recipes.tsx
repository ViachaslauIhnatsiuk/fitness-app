import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { recipeTypes } from './constants';
import { RecipeDefaultCard } from './recipeDefaultCard/RecipeDefaultCard';
import s from './Recipes.module.css';

const Recipes: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.recipes}>
        {recipeTypes.map((type) => (
          <RecipeDefaultCard type={type} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
};

export { Recipes };
