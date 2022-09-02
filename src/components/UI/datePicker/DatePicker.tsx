/* eslint-disable react/no-unstable-nested-components */
import React, { createElement, FC, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import s from './DatePicker.module.css';
import { Button } from '../button/Button';
import { DatePickerProps } from './models';

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

  const СustomInput = React.forwardRef<HTMLButtonElement, CustomInputProps>(
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
        customInput={createElement(СustomInput)}
      />
      <Button onClick={resetStateHandler} text="Reset" isStyled />
    </div>
  );
};

export { DatePicker };
