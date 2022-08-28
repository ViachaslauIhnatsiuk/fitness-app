import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { fetchRecipeByID } from '../../../helpers/fetchRecipeById';
import { IRecipeInfo } from '../../../models/modelRecipeById';
import { Button } from '../../UI/button/Button';
import s from './Recipe.module.css';
import { transformSummary } from '../../../helpers/transformSummary';

const Recipe = () => {
  const [recipeInfo, setRecipeInfo] = useState<IRecipeInfo>({} as IRecipeInfo);
  const params = useParams();
  const recipeId = params.recipeId || '';
  const category = params.category || '';

  useEffect(() => {
    (async () => {
      const data = await fetchRecipeByID(recipeId);
      setRecipeInfo(data);
    })().catch(() => {});
  }, [recipeId]);

  return (
    <div key={uuidv4()}>
      <Button path={`/food/recipes/${category}/`} icon={<IoChevronBackCircleOutline />} />
      {Object.keys(recipeInfo).length && (
        <div className={s.wrapper}>
          <h3 className={s.title}>{recipeInfo.title}</h3>
          <div className={s.recipe_info}>
            <img className={s.image} src={recipeInfo.image} alt={recipeInfo.sourceName} />

            <div className={s.description}>
              <div>Ready In Minutes: {recipeInfo.readyInMinutes} min.</div>
              <div>
                Cuisines:
                {recipeInfo.cuisines.map((cuisine) => (
                  <span> {cuisine},</span>
                ))}
              </div>
              <div>
                Diets:
                {recipeInfo.diets.map((diet) => (
                  <span> {diet},</span>
                ))}
              </div>
              <div>
                Types:
                {recipeInfo.dishTypes.map((dishType) => (
                  <span> {dishType},</span>
                ))}
              </div>
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

            <p className={s.summary}>Summary: {transformSummary(recipeInfo.summary)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export { Recipe };
