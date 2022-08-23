import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeByID } from '../../../helpers/fetchRecipeById';
import { IRecipeInfo } from '../../../models/modelRecipeById';
import s from './Recipe.module.css';

const Recipe = () => {
  const [recipeInfo, setRecipeInfo] = useState<IRecipeInfo>({} as IRecipeInfo);
  const params = useParams();
  const recipeId = params.recipeId || '';

  useEffect(() => {
    (async () => {
      const data = await fetchRecipeByID(recipeId);
      setRecipeInfo(data);
    })().catch(() => {});
  }, [recipeId]);

  return (
    <div>
      {Object.keys(recipeInfo).length && (
        <div className={s.recipe_info}>
          <h3 className={s.title}>{recipeInfo.title}</h3>
          <img className={s.image} src={recipeInfo.image} />
          <div>
            <span>Ready In Minutes: {recipeInfo.readyInMinutes}</span>
            <div>
              Types:
              {recipeInfo.dishTypes?.map((dishType) => (
                <span> {dishType}</span>
              ))}
            </div>
            <div className={s.ingredients}>
              Ingredients:
              {recipeInfo.extendedIngredients.map((ingredient) => (
                <div className={s.ingredient}>
                  <span>{ingredient.name}</span>
                  <span>: </span>
                  <span>{ingredient.measures.metric.amount}</span>
                  <span> - </span>
                  <span>{ingredient.measures.metric.unitLong}</span>
                </div>
              ))}
            </div>
          </div>
          <p className={s.summary}>{recipeInfo.summary}</p>
        </div>
      )}
    </div>
  );
};

export { Recipe };
