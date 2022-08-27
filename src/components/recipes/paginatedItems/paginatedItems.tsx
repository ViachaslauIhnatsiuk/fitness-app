import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../../store/model';
import { selectRecipes } from '../../../store/selectors';
import { fetchRecipes } from '../../../store/slices/recipes/recipesSlice';
import { useAppDispatch } from '../../../store/store';
import { RecipeCard } from '../recipeCard/RecipeCard';
import { ItemsProps } from './models';
import s from './paginatedItems.module.css';

const Items: FC<ItemsProps> = ({ currentItems }) => {
  return (
    <div className={s.recipes}>
      {currentItems.length && currentItems.map((item) => <RecipeCard data={item} key={uuidv4()} />)}
    </div>
  );
};

const PaginatedItems: FC = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const { recipes, queryParams } = useAppSelector(selectRecipes);
  const dispatch = useAppDispatch();
  const itemsPerPage = 12;
  const pageCount = Math.ceil(recipes.totalResults / itemsPerPage);

  useEffect(() => {
    dispatch(fetchRecipes({ ...queryParams, offset: itemOffset })).catch((err: Error) => err);
  }, [itemOffset]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = (selected * itemsPerPage) % recipes.totalResults;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={recipes.results} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<"
        containerClassName={s.btns_container}
        pageClassName={s.btns}
        activeClassName={s.btn_active}
        previousClassName={s.arrow_prev}
        nextClassName={s.arrow_next}
        disabledClassName={s.arrow_disabled}
      />
    </>
  );
};

export { PaginatedItems };
