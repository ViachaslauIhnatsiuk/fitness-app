import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import s from './CircleChart.module.css';
import { CircleTimerProps } from './models';

const CircleChart = ({
  maxValue = 100,
  currentValue = 0,
  fontSize = 40,
  strokeWidth = 10,
  text = 'Cal',
  color = '#7755ff'
}: Partial<CircleTimerProps>) => {
  return (
    <div className={s.wrapper}>
      <h4>{text}</h4>
      <CircularProgressbar
        strokeWidth={strokeWidth}
        minValue={0}
        maxValue={maxValue}
        value={currentValue}
        text={`${currentValue}`}
        styles={buildStyles({
          strokeLinecap: 'round',
          textSize: `${fontSize}px`,
          pathTransitionDuration: 0.5,
          pathColor: color,
          textColor: '#ffff',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7'
        })}
      />
    </div>
  );
};

export { CircleChart };
