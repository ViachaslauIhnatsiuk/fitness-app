import { useMemo } from 'react';
import { convertDateToReadableForm } from '../helpers/convertDateToReadableForm';
import { CalorieСonsumption, CalorieExpenditure } from '../models/Statistics';
import { convertDateToString } from '../store/helpers';

const useCalorieStatistics = (
  filterStart: Date,
  filterEnd: Date,
  page: number,
  maxItems: number,
  caloriesData: CalorieСonsumption | CalorieExpenditure
) => {
  const startFilterDate = Date.parse(convertDateToString(filterStart));
  const endFilterDate = Date.parse(convertDateToString(filterEnd));

  const labels = ['Calorie Expenditure', 'Calorie Сonsumption'];

  const keys = Object.keys(caloriesData).sort();

  const getDataForPieChart = () => {
    const totalCaloriesExpenditure = Object.values(caloriesData).reduce((sum, num) => sum + num, 0);
    const arrayOfCalories = [totalCaloriesExpenditure, 346];
    return { arrayOfCalories };
  };

  let dates = keys.map((key) => {
    return { x: key, y: caloriesData[key] };
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
      return { x: readableDate, y: caloriesData[key] };
    });
  }, [dates, startFilterDate, endFilterDate, caloriesData]);

  const maxPages = Math.ceil(dates.length / maxItems);
  const indicators = new Array(maxPages).fill(0).map((_, index) => index);
  const data = dates.slice(maxItems * page, maxItems * page + maxItems);

  return {
    data,
    getDataForPieChart,
    labels,
    maxPages,
    indicators
  };
};

export { useCalorieStatistics };
