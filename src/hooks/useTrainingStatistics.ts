import { useMemo } from 'react';
import { convertDateToReadableForm } from '../helpers/convertDateToReadableForm';
import { convertDateToString } from '../store/helpers';
import { useAppSelector } from '../store/model';
import { selectStatistics } from '../store/selectors';

const useTrainingStatistics = (
  filterStart: Date,
  filterEnd: Date,
  page: number,
  maxItems: number
) => {
  const {
    trainings: { dailyTimeTrainings }
  } = useAppSelector(selectStatistics);
  const startFilterDate = Date.parse(convertDateToString(filterStart));
  const endFilterDate = Date.parse(convertDateToString(filterEnd));

  const labels = ['Minutes'];

  const keys = Object.keys(dailyTimeTrainings).sort();

  let dates = keys.map((key) => {
    return { x: key, y: dailyTimeTrainings[key] };
  });

  dates = useMemo(() => {
    const convertedDatesToHours = dates.map(({ x: date }) => {
      return Date.parse(String(date));
    });
    const filteredDates = convertedDatesToHours.filter(
      (date) => date >= startFilterDate && date <= endFilterDate
    );
    const resultedDates = filteredDates.map((date) => convertDateToString(new Date(date))).sort();
    return resultedDates.map((key) => {
      const readableDate = convertDateToReadableForm(key);
      return { x: readableDate, y: dailyTimeTrainings[key] };
    });
  }, [dates, startFilterDate, endFilterDate, dailyTimeTrainings]);

  const maxPages = Math.ceil(dates.length / maxItems);
  const indicators = new Array(maxPages).fill(0).map((_, index) => index);
  const data = dates.slice(maxItems * page, maxItems * page + maxItems);

  return {
    data,
    labels,
    maxPages,
    page,
    indicators
  };
};

export { useTrainingStatistics };
