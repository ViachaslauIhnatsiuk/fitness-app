import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../store/model';
import { selectRecipes } from '../../store/selectors';
import { RecipesRequestConfig } from '../../store/slices/recipes/model';
import { fetchRecipes } from '../../store/slices/recipes/recipesSlice';
import { useAppDispatch } from '../../store/store';
import { recipeTypes } from './constants';
import { RecipeCard } from './recipeCard/RecipeCard';
import { RecipeDefaultCard } from './recipeDefaultCard/recipeDefaultCard';
import s from './Recipes.module.css';

const Recipes: FC = () => {
  const [queryConfig, setQueryConfig] = useState<RecipesRequestConfig>({ query: '', type: '' });
  const { recipes, isLoading, error, isUploaded, queryParams } = useAppSelector(selectRecipes);
  const dispatch = useAppDispatch();

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) =>
    setQueryConfig({ ...queryConfig, query: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRecipes(queryConfig)).catch((err: Error) => err);
  };

  const handleDeleteValue = () => setQueryConfig({ ...queryConfig, query: '' });

  const handleClickOnDefaultType = (type: string) => {
    setQueryConfig({ ...queryConfig, type });
    dispatch(fetchRecipes({ ...queryConfig, type })).catch((err: Error) => err);
  };

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.input_wrapper}>
          <input
            type="text"
            className={s.input}
            placeholder="Enter recipe"
            value={queryConfig.query}
            onChange={(e) => handleInputValue(e)}
          />
          <FiSearch className={s.icon_search} />
          {queryConfig.query && <CgCloseR className={s.icon_delete} onClick={handleDeleteValue} />}
        </div>
      </form>
      <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h2>{error}</h2>}
        {recipes && (
          <>
            {isUploaded && (
              <h3 className={s.subtitle}>
                1-12 of {recipes.totalResults} results for query=&ldquo;{queryParams.query}&rdquo;,
                type=&ldquo;{queryParams.type}&rdquo;
              </h3>
            )}
            <div className={s.recipes}>
              {recipes.results.map((item) => (
                <RecipeCard data={item} key={uuidv4()} />
              ))}
            </div>
          </>
        )}
        {!recipes.totalResults && !queryConfig.query && (
          <div className={s.recipes}>
            {recipeTypes.map((type) => (
              <RecipeDefaultCard type={type} onClick={handleClickOnDefaultType} key={uuidv4()} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Recipes };
