import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { useAppSelector } from '../../store/model';
import { selectRecipes } from '../../store/selectors';
import { fetchRecipes } from '../../store/slices/recipesSlice';
import { useAppDispatch } from '../../store/store';
import { Recipe } from './recipe/Recipe';
import s from './Recipes.module.css';

const Recipes: FC = () => {
  const [query, setQuery] = useState<string>('');
  const { recipes, isLoading, error } = useAppSelector(selectRecipes);
  const dispatch = useAppDispatch();

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchRecipes(query));
    setQuery('');
  };

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
          {query && (
            <button type="submit" className={s.button}>
              <CgCloseR className={s.icon} />
            </button>
          )}
        </div>
      </form>
      <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h2>{error}</h2>}
        {recipes && (
          <div className={s.recipes}>
            {recipes.hits.map((item) => (
              <Recipe data={item.recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Recipes };
