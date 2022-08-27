import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useAppSelector } from '../../../store/model';
import { selectTrainings } from '../../../store/selectors';
import { setFilterBySearch } from '../../../store/slices/training/trainingSlice';
import { useAppDispatch } from '../../../store/store';

const FilterBySearch = () => {
  const dispatch = useAppDispatch();
  const { filterBySearch } = useAppSelector(selectTrainings);
  const [filter, setFilter] = useState<string>(filterBySearch || '');

  const debouncedValue = useDebounce<string>(filter, 500);

  const changeSearchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: level } = e.target;
    setFilter(level);
  };

  const clearSearchValueHandler = () => {
    setFilter('');
  };

  useEffect(() => {
    dispatch(setFilterBySearch(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <div>
      <input
        placeholder="Search"
        type="text"
        onChange={changeSearchValueHandler}
        value={filter}
        autoComplete="off"
      />
      <button type="button" onClick={clearSearchValueHandler}>
        X
      </button>
    </div>
  );
};

export { FilterBySearch };
