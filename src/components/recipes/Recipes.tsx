import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { useAppSelector } from '../../store/model';
import { fetchRecipes } from '../../store/slices/recipesSlice';
import { useAppDispatch } from '../../store/store';
import { RecipeItem } from './recipe/Recipe';
import s from './Recipes.module.css';

const Recipes: FC = () => {
  const [query, setQuery] = useState<string>('');
  const { recipes, isLoading, error } = useAppSelector((state) => state.recipes);
  const dispatch = useAppDispatch();

  const handlerInputValue = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchRecipes(query));
    setQuery('');
  };

  return (
    <div className={s.wrapper}>
      <form className={s.search_form} onSubmit={(e) => handlerSubmit(e)}>
        <div className={s.search_input_wrapper}>
          <input
            type="text"
            className={s.search_input}
            placeholder="Enter recipe"
            value={query}
            onChange={(e) => handlerInputValue(e)}
          />
          {query && (
            <button type="submit" className={s.search_button}>
              <CgCloseR className={s.search_button_icon} />
            </button>
          )}
        </div>
      </form>
      <div>
        {isLoading && <h1>Loading...</h1>}
        {error && <h2>{error}</h2>}
        {recipes && (
          <div className={s.recipes_wrapper}>
            {recipes.hits.map((item) => (
              <RecipeItem data={item.recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Recipes };
