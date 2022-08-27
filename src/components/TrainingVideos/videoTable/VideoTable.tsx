import React, { FC } from 'react';
import { tableHeaders, tableRows } from './constants';
import { VideoTableProps } from './models';
import { addPercentage } from './utils';
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
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row, index) => (
          <tr>
            <td>{row}</td>
            <td>{levels[index]}</td>
            <td>{reps.replace('reps', '')}</td>
            <td>{rest}</td>
            <td>{addPercentage(cal, index)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { VideoTable };
