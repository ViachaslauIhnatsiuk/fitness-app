import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { normalizeRangeItems } from '../../../helpers/normalizeRangeItems';
import { useAppSelector } from '../../../store/model';
import { selectRecipes } from '../../../store/selectors';
import { fetchRecipes } from '../../../store/slices/recipes/recipesSlice';
import { useAppDispatch } from '../../../store/store';
import { Button } from '../../UI/button/Button';
import Loader from '../../UI/loader/Loader';
import { itemsPerPage } from '../constants';
import { PaginatedItems } from '../paginatedItems/PaginatedItems';
import s from './RecipesCategory.module.css';

const RecipesCategory = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { recipes, isLoading, error, isUploaded, queryParams } = useAppSelector(selectRecipes);
  const dispatch = useAppDispatch();
  const [left, right] = normalizeRangeItems(queryParams.offset, itemsPerPage, recipes.totalResults);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRecipes({ ...queryParams, query: inputValue })).catch((err: Error) => err);
  };

  const handleDeleteValue = () => setInputValue('');

  useEffect(() => {
    dispatch(fetchRecipes(queryParams)).catch((err: Error) => err);
  }, []);

  return (
    <>
      <Button path="/food/recipes" icon={<IoChevronBackCircleOutline />} />
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.input_wrapper}>
          <input
            type="text"
            className={s.input}
            placeholder="Enter recipe"
            value={inputValue}
            onChange={handleInputValue}
          />
          <FiSearch className={s.icon_search} />
          {queryParams.query && <CgCloseR className={s.icon_delete} onClick={handleDeleteValue} />}
        </div>
      </form>
      {isLoading && <Loader />}
      {error && <h2>{error}</h2>}
      {isUploaded &&
        (recipes.totalResults ? (
          <>
            <h3 className={s.subtitle}>
              {left}-{right} of {recipes.totalResults} results for query=&ldquo;
              {queryParams.query}
              &rdquo;, type=&ldquo;{queryParams.type}&rdquo;
            </h3>
            <PaginatedItems />
          </>
        ) : (
          <h3 className={s.subtitle}>
            Nothing was found for your query &ldquo;{queryParams.query}&rdquo; in the &ldquo;
            {queryParams.type}&rdquo; category
          </h3>
        ))}
    </>
  );
};

export { RecipesCategory };
