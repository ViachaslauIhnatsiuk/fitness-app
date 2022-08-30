import React, { FC } from 'react';
import { RadioProps } from './models';
import s from './Radio.module.css';

const Radio: FC<RadioProps> = ({ name, onChange, value, state }) => {
  const isCheckedBox = state ? state === value : false;

  return (
    <div className={s.radio}>
      <input
        className={s.input}
        id={value}
        type="radio"
        name={name}
        value={value}
        checked={isCheckedBox}
        onChange={onChange}
      />
      <label htmlFor={value} className={s.label}>
        {value}
      </label>
    </div>
  );
};

export { Radio };
