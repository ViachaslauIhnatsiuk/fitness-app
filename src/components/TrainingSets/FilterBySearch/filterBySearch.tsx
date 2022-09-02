import React, { ChangeEvent, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { useDebounce } from '../../../hooks/useDebounce';
import { useAppSelector } from '../../../store/model';
import { selectTrainings } from '../../../store/selectors';
import { setFilterBySearch } from '../../../store/slices/training/trainingSlice';
import { useAppDispatch } from '../../../store/store';
import s from './filterBySearch.module.css';

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
    <div className={s.input_wrapper}>
      <input
        type="text"
        className={s.input}
        placeholder="Enter workout"
        value={filter}
        onChange={changeSearchValueHandler}
      />
      <FiSearch className={s.icon_search} />
      {filter && <IoMdClose className={s.icon_delete} onClick={clearSearchValueHandler} />}
    </div>
  );
};

export { FilterBySearch };
