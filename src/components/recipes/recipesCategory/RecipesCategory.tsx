import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { normalizeRangeItems } from '../../../helpers/normalizeRangeItems';
import { useAppSelector } from '../../../store/model';
import { selectRecipes } from '../../../store/selectors';
import { fetchRecipes } from '../../../store/slices/recipes/recipesSlice';
import { useAppDispatch } from '../../../store/store';
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

  const handleDeleteValue = () => {
    setInputValue('');
    dispatch(fetchRecipes({ ...queryParams, query: '' })).catch((err: Error) => err);
  };

  useEffect(() => {
    dispatch(fetchRecipes(queryParams)).catch((err: Error) => err);
  }, []);

  return (
    <div className={s.main}>
      <Link className={s.return} to="/food/recipes">
        <BsArrowLeft className={s.icon} />
      </Link>
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
          {inputValue && <IoMdClose className={s.icon_delete} onClick={handleDeleteValue} />}
        </div>
      </form>
      {isLoading && <Loader />}
      {error && <h2>{error}</h2>}
      {isUploaded &&
        (recipes.totalResults ? (
          <>
            <h3 className={s.subtitle}>
              {left}-{right} of {recipes.totalResults} results for &ldquo;{queryParams.type}&rdquo;
            </h3>
            <PaginatedItems />
          </>
        ) : (
          <h3 className={s.subtitle}>
            Nothing was found for your query &ldquo;{queryParams.query}&rdquo; in the &ldquo;
            {queryParams.type}&rdquo; category
          </h3>
        ))}
    </div>
  );
};

export { RecipesCategory };
