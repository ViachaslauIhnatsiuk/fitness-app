import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import s from './Charts.module.css';
import { BarChart } from '../UI/barChart/BarChart';
import { useCalorieStatistics } from '../../hooks/useCalorieStatistics';
import { AreaChart } from '../UI/areaChart/AreaChart';
import { Button } from '../UI/button/Button';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePicker } from '../UI/datePicker/DatePicker';
import {
  AREA_CHART_TITLE,
  BAR_CHART_TITLE,
  CHANGE_CHART_BTN_TITLE,
  INITIAL_CHART_INDEX,
  INITIAL_END_DATE,
  INITIAL_ITEMS_PER_SLIDE,
  INITIAL_START_DATE,
  NEXT_SLIDE_BTN_TITLE,
  options,
  PREV_SLIDE_BTN_TITLE
} from './constants';
import { useTrainingStatistics } from '../../hooks/useTrainingStatistics';
import { CircularProgressChart } from './circularProgressChart/CircularProgressChart';

const Charts: FC = () => {
  const [date, setDate] = useState<[Date, Date]>([INITIAL_START_DATE, INITIAL_END_DATE]);
  const [page, setPage] = useState<number>(0);
  const [maxItems, setMaxItems] = useState<number>(INITIAL_ITEMS_PER_SLIDE);
  const [currentChartIndex, setCurrentChartIndex] = useState<number>(INITIAL_CHART_INDEX);
  const [dateStart, dateEnd] = date;

  const {
    data: calorieData,
    labels: calorieLabels,
    maxPages: maxCaloriePages,
    indicators: calorieIndicators
  } = useCalorieStatistics(dateStart, dateEnd, page, maxItems);

  const {
    labels: trainingLabels,
    data: trainingData,
    indicators: trainingIndicators,
    maxPages: maxTrainingPages
  } = useTrainingStatistics(dateStart, dateEnd, page, maxItems);

  const indicatorsChart = [calorieIndicators, trainingIndicators];
  const maxPagesCharts = [maxCaloriePages, maxTrainingPages];
  const charts = [
    <BarChart data={calorieData} labels={calorieLabels} title={BAR_CHART_TITLE} />,
    <AreaChart data={trainingData} labels={trainingLabels} title={AREA_CHART_TITLE} />
  ];

  const changeIndexChartHandler = () => {
    if (currentChartIndex === charts.length - 1) {
      setCurrentChartIndex(0);
    } else {
      setCurrentChartIndex((prev) => prev + 1);
    }
  };

  const onNextHandler = () => {
    if (page >= maxPagesCharts[currentChartIndex] - 1) {
      setPage(0);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const onPrevHandler = () => {
    if (page <= 0) {
      setPage(0);
    } else {
      setPage((prev) => prev - 1);
    }
  };

  const changeMaxItemsViewHandler = ({
    target: { value }
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setMaxItems(Number(value));
    onPrevHandler();
  };

  const updateStateDates = (dates: [Date, Date]) => setDate(dates);

  return (
    <div className={s.wrapper}>
      <Button onClick={changeIndexChartHandler} text={CHANGE_CHART_BTN_TITLE} isStyled />
      <div>
        <Button onClick={onNextHandler} text={NEXT_SLIDE_BTN_TITLE} isStyled />
        <Button onClick={onPrevHandler} text={PREV_SLIDE_BTN_TITLE} isStyled />
      </div>
      <select onChange={changeMaxItemsViewHandler} defaultValue={5}>
        {options.map((value) => (
          <option key={uuidv4()} value={value}>
            {value}
          </option>
        ))}
      </select>
      {charts[currentChartIndex]}
      <div className={s.indicators}>
        {indicatorsChart[currentChartIndex].length >= 1 &&
          indicatorsChart[currentChartIndex].map((element) => {
            return (
              <div
                key={uuidv4()}
                className={s.indicator}
                style={{ backgroundColor: page === element ? '#7755ff' : 'transparent' }}
              />
            );
          })}
      </div>
      <div className={s.date}>
        <DatePicker
          getCurrentState={updateStateDates}
          initialDates={[INITIAL_START_DATE, INITIAL_END_DATE]}
        />
      </div>
      <CircularProgressChart />
    </div>
  );
};

export { Charts };
