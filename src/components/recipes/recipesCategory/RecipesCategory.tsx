import React, { ChangeEvent, FormEvent } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';
import { normalizeRangeItems } from '../../../helpers/normalizeRangeItems';
import { useAppSelector } from '../../../store/model';
import { selectRecipes } from '../../../store/selectors';
import { fetchRecipes, setQueryParams } from '../../../store/slices/recipes/recipesSlice';
import { useAppDispatch } from '../../../store/store';
import Loader from '../../UI/loader/Loader';
import { itemsPerPage } from '../constants';
import { PaginatedItems } from '../paginatedItems/PaginatedItems';
import s from './RecipesCategory.module.css';

const RecipesCategory = () => {
  const { recipes, isLoading, error, isUploaded, queryParams } = useAppSelector(selectRecipes);
  const dispatch = useAppDispatch();
  const [left, right] = normalizeRangeItems(queryParams.offset, itemsPerPage, recipes.totalResults);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) =>
    setQueryParams({ ...queryParams, query: e.target.value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRecipes(queryParams)).catch((err: Error) => err);
  };

  const handleDeleteValue = () => setQueryParams({ ...queryParams, query: '' });

  return (
    <>
      {isLoading && <Loader />}
      {error && <h2>{error}</h2>}
      {!!recipes.totalResults && (
        <>
          {isUploaded && (
            <>
              <form className={s.form} onSubmit={handleSubmit}>
                <div className={s.input_wrapper}>
                  <input
                    type="text"
                    className={s.input}
                    placeholder="Enter recipe"
                    value={queryParams.query}
                    onChange={handleInputValue}
                  />
                  <FiSearch className={s.icon_search} />
                  {queryParams.query && (
                    <CgCloseR className={s.icon_delete} onClick={handleDeleteValue} />
                  )}
                </div>
              </form>
              <h3 className={s.subtitle}>
                {left}-{right} of {recipes.totalResults} results for query=&ldquo;
                {queryParams.query}
                &rdquo;, type=&ldquo;{queryParams.type}&rdquo;
              </h3>
            </>
          )}
          <PaginatedItems />
        </>
      )}
    </>
  );
};

export { RecipesCategory };
