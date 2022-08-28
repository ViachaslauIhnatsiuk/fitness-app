import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemsProps } from './models';
import { RecipeCard } from '../../recipeCard/RecipeCard';
import s from './Items.module.css';

const Items: FC<ItemsProps> = ({ currentItems }) => {
  return (
    <div className={s.recipes}>
      {currentItems.length && currentItems.map((item) => <RecipeCard data={item} key={uuidv4()} />)}
    </div>
  );
};

export { Items };
