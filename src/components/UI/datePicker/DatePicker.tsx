/* eslint-disable react/no-unstable-nested-components */
import React, { createElement, FC, useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import ReactDatePicker from 'react-datepicker';
import s from './DatePicker.module.css';
import { Button } from '../button/Button';
import { DatePickerProps } from './models';

const DatePicker: FC<DatePickerProps> = ({ initialDate, getCurrentState }) => {
  const [date, setDate] = useState<Date>(initialDate);

  const changeDateHandler = (dateValue: Date) => {
    setDate(dateValue);
  };

  const resetStateHandler = () => setDate(initialDate);

  useEffect(() => {
    getCurrentState(date);
  }, [date, getCurrentState]);

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
        selected={date}
        onChange={changeDateHandler}
        customInput={createElement(СustomInput)}
      />
      <Button onClick={resetStateHandler} icon={<TiDelete className={s.icon} />} />
    </div>
  );
};

export { DatePicker };
