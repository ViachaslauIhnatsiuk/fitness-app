import React, { ChangeEvent, FC } from 'react';
import { WorkoutFilterByLevel } from '../../../models/Workout';
import { useAppSelector } from '../../../store/model';
import { selectTrainings } from '../../../store/selectors';
import { setFilterByLevel } from '../../../store/slices/training/trainingSlice';
import { useAppDispatch } from '../../../store/store';
import { Radio } from '../../UI/radio/Radio';
import { levelsOfTraining } from './constants';
import s from './filterByLevel.module.css';

const FilterByLevel: FC = () => {
  const dispatch = useAppDispatch();
  const { filterByLevel } = useAppSelector(selectTrainings);

  const changeLevelHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: level } = e.target;
    dispatch(setFilterByLevel(level as WorkoutFilterByLevel));
  };

  return (
    <div className={s.filters}>
      <ul>
        {levelsOfTraining.map(({ level, nameCheckbox }) => {
          return (
            <Radio
              key={level}
              name={nameCheckbox}
              value={level}
              onChange={changeLevelHandler}
              state={filterByLevel}
            />
          );
        })}
      </ul>
    </div>
  );
};

export { FilterByLevel };
