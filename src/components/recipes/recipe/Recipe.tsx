import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { fetchRecipeByID } from '../../../helpers/fetchRecipeById';
import { IRecipeInfo } from '../../../models/modelRecipeById';
import { Button } from '../../UI/button/Button';
import s from './Recipe.module.css';
import { transformSummary } from '../../../helpers/transformSummary';
import { concatFieldOfIngredient } from '../../../helpers/concatFieldOfIngredient';
import { useAppDispatch } from '../../../store/store';
import { useAppSelector } from '../../../store/model';
import { selectFavorites } from '../../../store/selectors';
import { toggleRecipeInFavorites } from '../../../store/slices/profileSlice';

const Recipe = () => {
  const [recipeInfo, setRecipeInfo] = useState<IRecipeInfo>({} as IRecipeInfo);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const params = useParams();
  const recipeId = params.recipeId || '';
  const category = params.category || '';
  const path = `/food/recipes/${category}/`;

  useEffect(() => {
    (async () => {
      const data = await fetchRecipeByID(+recipeId);
      setRecipeInfo(data);
    })().catch(() => {});
  }, [recipeId]);

  const toggleFavoriteRecipe = () => dispatch(toggleRecipeInFavorites(+recipeId));

  return (
    <div>
      <Button path={path} icon={<IoChevronBackCircleOutline />} />
      {Object.keys(recipeInfo).length && (
        <div className={s.wrapper}>
          <div>
            {favorites.recipes.includes(+recipeId) ? (
              <Button icon={<MdFavorite />} onClick={toggleFavoriteRecipe} />
            ) : (
              <Button icon={<MdFavoriteBorder />} onClick={toggleFavoriteRecipe} />
            )}
          </div>
          <h3 className={s.title}>{recipeInfo.title}</h3>
          <div className={s.recipe_info}>
            <img className={s.image} src={recipeInfo.image} alt={recipeInfo.sourceName} />
            <div className={s.ingredients}>
              Ingredients:
              {recipeInfo.extendedIngredients.map(({ name, measures }) => (
                <span className={s.ingredient} key={uuidv4()}>
                  {concatFieldOfIngredient(name, measures.metric.amount, measures.metric.unitShort)}
                </span>
              ))}
            </div>
            <div className={s.description}>
              <p>Ready In Minutes: {recipeInfo.readyInMinutes} min.</p>
              <p>Cuisines: {Object.values(recipeInfo.cuisines).join(', ')}</p>
              <p>Diets: {Object.values(recipeInfo.diets).join(', ')}</p>
              <p>Types: {Object.values(recipeInfo.dishTypes).join(', ')}</p>
            </div>
            <p className={s.summary}>Summary: {transformSummary(recipeInfo.summary)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export { Recipe };
