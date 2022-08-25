import React, { FC } from 'react';
import { RadioProps } from './models';

const Radio: FC<RadioProps> = ({ name, onChange, value, state }) => {
  const isCheckedBox = state ? state === value : false;

  return (
    <li data-testid="checkbox">
      <label htmlFor={value}>
        <input
          className="filled-in"
          id={value}
          type="radio"
          name={name}
          value={value}
          checked={isCheckedBox}
          onChange={onChange}
        />
        <span>{value}</span>
      </label>
    </li>
  );
};

export { Radio };
