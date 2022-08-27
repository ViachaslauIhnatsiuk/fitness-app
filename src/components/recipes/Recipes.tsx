import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../store/model';
import { selectRecipes } from '../../store/selectors';
import { fetchRecipes } from '../../store/slices/recipesSlice';
import { useAppDispatch } from '../../store/store';
import { RecipeCard } from './recipeCard/RecipeCard';
import s from './Recipes.module.css';

const Recipes: FC = () => {
  const [query, setQuery] = useState<string>('');
  const { recipes, isLoading, error, isUploaded, queryRequest } = useAppSelector(selectRecipes);
  const dispatch = useAppDispatch();

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRecipes(query)).catch((err: Error) => err);
  };

  const handleDeleteValue = () => setQuery('');

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.input_wrapper}>
          <input
            type="text"
            className={s.input}
            placeholder="Enter recipe"
            value={query}
            onChange={(e) => handleInputValue(e)}
          />
          <FiSearch className={s.icon_search} />
          {query && <CgCloseR className={s.icon_delete} onClick={handleDeleteValue} />}
        </div>
      </form>
      <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h2>{error}</h2>}
        {recipes && (
          <>
            {isUploaded && (
              <h3 className={s.subtitle}>
                1-12 of {recipes.totalResults} results for &ldquo;{queryRequest}&rdquo;
              </h3>
            )}
            <div className={s.recipes}>
              {recipes.results.map((item) => (
                <RecipeCard data={item} key={uuidv4()} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { Recipes };
