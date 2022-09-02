import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';
import { useAppSelector } from '../../../store/model';
import { selectRecipes } from '../../../store/selectors';
import { fetchRecipes } from '../../../store/slices/recipes/recipesSlice';
import { useAppDispatch } from '../../../store/store';
import { itemsPerPage } from '../constants';
import { Items } from './items/Items';
import s from './PaginatedItems.module.css';

const PaginatedItems: FC = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const { recipes, queryParams } = useAppSelector(selectRecipes);
  const dispatch = useAppDispatch();
  const pageCount = Math.ceil(recipes.totalResults / itemsPerPage);

  useEffect(() => {
    dispatch(fetchRecipes({ ...queryParams, offset: itemOffset })).catch((err: Error) => err);
  }, [itemOffset]);

  const handlePageClick = ({ selected }: { selected: number }): void => {
    const newOffset = (selected * itemsPerPage) % recipes.totalResults;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={recipes.results} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<MdOutlineNavigateNext />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={<MdOutlineNavigateBefore />}
        containerClassName={s.btns_container}
        pageClassName={s.btns}
        breakClassName={s.break}
        activeClassName={s.btn_active}
        previousClassName={s.arrow_prev}
        nextClassName={s.arrow_next}
        disabledClassName={s.arrow_disabled}
      />
    </>
  );
};

export { PaginatedItems };
