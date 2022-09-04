import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../../store/model';
import { selectFavorites } from '../../../store/selectors';
import { RecipeCard } from '../../recipes/recipeCard/RecipeCard';
import s from './FavoriteRecipes.module.css';

const FavoriteRecipes = () => {
  const favorites = useAppSelector(selectFavorites);

  return (
    <div className={s.wrapper}>
      <Link className={s.return} to="/">
        <BsArrowLeft className={s.icon} />
      </Link>
      <h2 className={s.title}>Favorite Recipes</h2>
      {favorites.recipes.length === 0 && <h4>There is nothing here yet</h4>}
      <div className={favorites.recipes.length ? s.content : s.flex_content}>
        {favorites.recipes.map((recipe) => {
          return <RecipeCard key={uuidv4()} data={recipe} />;
        })}
      </div>
    </div>
  );
};

export { FavoriteRecipes };
