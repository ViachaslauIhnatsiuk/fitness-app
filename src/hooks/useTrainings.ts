import { useMemo } from 'react';
import { useAppSelector } from '../store/model';
import { selectWorkout } from '../store/selectors';

const useTrainings = () => {
  const { filterByLevel, filterBySearch, trainings } = useAppSelector(selectWorkout);

  let filteredTrainings = trainings;

  // search
  filteredTrainings = useMemo(() => {
    return trainings.filter(({ title }) => {
      return title.toLowerCase().includes(filterBySearch.toLowerCase());
    });
  }, [filterBySearch, trainings]);

  // filter
  filteredTrainings = useMemo(() => {
    if (filterByLevel === 'All') return filteredTrainings;
    return [...filteredTrainings].filter(({ level }) => level === filterByLevel);
  }, [filterByLevel, filteredTrainings]);

  return filteredTrainings;
};

export { useTrainings };
