import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowLeft, BsBookmarkDash, BsBookmarkDashFill } from 'react-icons/bs';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchRecipeByID } from '../../../helpers/fetchRecipeById';
import { IRecipeInfo } from '../../../models/modelRecipeById';
import { transformSummary } from '../../../helpers/transformSummary';
import { concatFieldOfIngredient } from '../../../helpers/concatFieldOfIngredient';
import { useAppDispatch } from '../../../store/store';
import { useAppSelector } from '../../../store/model';
import { selectFavorites } from '../../../store/selectors';
import { toggleRecipeInFavorites } from '../../../store/slices/profileSlice';
import { getPrevLocation } from '../../../helpers/getPrevLocation';
import Loader from '../../UI/loader/Loader';
import s from './Recipe.module.css';

const Recipe = () => {
  const [recipeInfo, setRecipeInfo] = useState<IRecipeInfo>({} as IRecipeInfo);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const params = useParams();
  const recipeId = params.recipeId || '';
  const location = useLocation();
  const prevLocation = getPrevLocation(location.pathname);
  const { id, title, image } = recipeInfo;

  useEffect(() => {
    (async () => {
      const data = await fetchRecipeByID(Number(recipeId));
      setRecipeInfo(data);
    })().catch(() => {});
  }, [recipeId]);

  const toggleFavoriteRecipe = () => dispatch(toggleRecipeInFavorites({ id, title, image }));

  return (
    <div className={s.main}>
      <Link className={s.return} to={prevLocation}>
        <BsArrowLeft className={s.icon} />
      </Link>
      {Object.keys(recipeInfo).length ? (
        <div className={s.wrapper}>
          {favorites.recipes.find((recipe) => recipe.id === recipeInfo.id) ? (
            <BsBookmarkDashFill onClick={toggleFavoriteRecipe} className={s.bookmark} />
          ) : (
            <BsBookmarkDash onClick={toggleFavoriteRecipe} className={s.bookmark} />
          )}
          <h3 className={s.title}>{recipeInfo.title}</h3>
          <div className={s.recipe_info}>
            <div className={s.recipe_top}>
              <img className={s.image} src={recipeInfo.image} alt={recipeInfo.sourceName} />
              <div className={s.ingredients}>
                <span className={s.ingredients_title}>Ingredients:</span>
                {recipeInfo.extendedIngredients.map(({ name, measures }) => (
                  <div className={s.ingredient} key={uuidv4()}>
                    -{' '}
                    {concatFieldOfIngredient(
                      name,
                      measures.metric.amount,
                      measures.metric.unitShort
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={s.description}>
              <p>Ready In Minutes: {recipeInfo.readyInMinutes} min.</p>
              <p>Cuisines: {recipeInfo.cuisines.join(', ')}</p>
              <p>Diets: {recipeInfo.diets.join(', ')}</p>
              <p>Types: {recipeInfo.dishTypes.join(', ')}</p>
            </div>
            <p className={s.summary}>Summary: {transformSummary(recipeInfo.summary)}</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export { Recipe };
