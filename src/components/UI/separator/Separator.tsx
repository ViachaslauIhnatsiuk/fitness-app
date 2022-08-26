import React, { FC } from 'react';
import { ISeparator } from './models';
import s from './Separator.module.css';

const Separator: FC<ISeparator> = ({ text }) => {
  return (
    <div className={s.separator}>
      <div className={s.text}>{text}</div>
    </div>
  );
};

export { Separator };
