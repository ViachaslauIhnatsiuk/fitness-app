/* eslint-disable react/no-unstable-nested-components */
import React, { createElement, FC, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { DatePickerProps } from './models';
import s from './DatePicker.module.css';

const DatePicker: FC<DatePickerProps> = ({ initialDates, getCurrentState }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(initialDates);
  const [startDate, endDate] = dateRange;

  const resetStateHandler = () => setDateRange(initialDates);

  useEffect(() => {
    if (startDate && endDate) {
      getCurrentState(dateRange as [Date, Date]);
    }
  }, [dateRange, endDate, getCurrentState, startDate]);

  type CustomInputProps = {
    value: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };

  const –°ustomInput = React.forwardRef<HTMLButtonElement, CustomInputProps>(
    ({ value, onClick }, ref) => (
      <button ref={ref} type="button" onClick={onClick} className={s.input}>
        {value}
      </button>
    )
  );
  return (
    <div className={s.wrapper}>
      <ReactDatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
        }}
        customInput={createElement(–°ustomInput)}
      />
      <button type="button" className={s.reset} onClick={resetStateHandler}>
        Reset
      </button>
    </div>
  );
};

export { DatePicker };
