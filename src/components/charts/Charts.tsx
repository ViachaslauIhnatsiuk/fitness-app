import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { BarChart } from '../UI/barChart/BarChart';
import { useCalorieStatistics } from '../../hooks/useCalorieStatistics';
import { AreaChart } from '../UI/areaChart/AreaChart';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePicker } from '../UI/datePicker/DatePicker';
import {
  AREA_CHART_TITLE,
  BAR_CHART_TITLE,
  INITIAL_CHART_INDEX,
  INITIAL_END_DATE,
  INITIAL_START_DATE
} from './constants';
import { useTrainingStatistics } from '../../hooks/useTrainingStatistics';
import { CircularProgressChart } from './circularProgressChart/CircularProgressChart';
import s from './Charts.module.css';

const Charts: FC = () => {
  const [date, setDate] = useState<[Date, Date]>([INITIAL_START_DATE, INITIAL_END_DATE]);
  const [page, setPage] = useState<number>(0);
  const [currentChartIndex, setCurrentChartIndex] = useState<number>(INITIAL_CHART_INDEX);
  const [dateStart, dateEnd] = date;

  const {
    data: calorieData,
    labels: calorieLabels,
    maxPages: maxCaloriePages,
    indicators: calorieIndicators
  } = useCalorieStatistics(dateStart, dateEnd, page, 10);

  const {
    labels: trainingLabels,
    data: trainingData,
    indicators: trainingIndicators,
    maxPages: maxTrainingPages
  } = useTrainingStatistics(dateStart, dateEnd, page, 10);

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
    if (page < maxPagesCharts[currentChartIndex] - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const onPrevHandler = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const updateStateDates = (dates: [Date, Date]) => setDate(dates);

  return (
    <div className={s.wrapper}>
      <div className={s.carts}>
        <div className={s.navigation}>
          <div className={s.date}>
            <DatePicker
              getCurrentState={updateStateDates}
              initialDates={[INITIAL_START_DATE, INITIAL_END_DATE]}
            />
          </div>
          <div className={s.buttons}>
            <button type="button" className={s.next} onClick={onPrevHandler}>
              <AiFillCaretLeft className={s.arrow} />
            </button>
            <button type="button" className={s.change} onClick={changeIndexChartHandler}>
              Change Chart
            </button>
            <button type="button" className={s.previuos} onClick={onNextHandler}>
              <AiFillCaretRight className={s.arrow} />
            </button>
          </div>
        </div>
        {charts[currentChartIndex]}
        <div className={s.indicators}>
          {indicatorsChart[currentChartIndex].length >= 1 &&
            indicatorsChart[currentChartIndex].map((element) => {
              return (
                <div
                  key={uuidv4()}
                  className={s.indicator}
                  style={{
                    backgroundColor: page === element ? 'rgba(198, 72, 73, 0.4)' : 'transparent'
                  }}
                />
              );
            })}
        </div>
      </div>
      <CircularProgressChart />
    </div>
  );
};

export { Charts };
