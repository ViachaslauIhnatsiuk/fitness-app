import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { calculateCalories } from '../utils';
import { tableHeaders, tableRows } from './constants';
import { VideoTableProps } from './models';
import s from './VideoTable.module.css';

const VideoTable: FC<VideoTableProps> = ({ videoDetails: { cal, levels, reps, rest } }) => {
  return (
    <table className={s.table}>
      <colgroup>
        <col style={{ backgroundColor: '#2b253a' }} />
      </colgroup>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={uuidv4()}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, index) => (
          <tr key={uuidv4()}>
            <td>{row}</td>
            <td>{levels[index]}</td>
            <td>{reps.replace('reps', '')}</td>
            <td>{rest}</td>
            <td>{calculateCalories(levels[index], cal)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { VideoTable };
