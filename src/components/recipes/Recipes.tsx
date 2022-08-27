import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../store/model';
import { selectRecipes } from '../../store/selectors';
import { fetchRecipes } from '../../store/slices/recipes/recipesSlice';
import { useAppDispatch } from '../../store/store';
import { recipeTypes } from './constants';
import { RecipeDefaultCard } from './recipeDefaultCard/recipeDefaultCard';
import s from './Recipes.module.css';

const Recipes: FC = () => {
  const { queryParams } = useAppSelector(selectRecipes);
  const dispatch = useAppDispatch();

  const handleClickOnDefaultType = (type: string) => {
    dispatch(fetchRecipes({ ...queryParams, type })).catch((err: Error) => err);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.recipes}>
        {recipeTypes.map((type) => (
          <RecipeDefaultCard type={type} onClick={handleClickOnDefaultType} key={uuidv4()} />
        ))}
      </div>
    </div>
  );
};

export { Recipes };
