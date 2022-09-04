import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircleTimerProps } from './models';
import './CircleChart.css';

const CircleChart = ({
  maxValue = 100,
  currentValue = 0,
  fontSize = 32,
  strokeWidth = 5,
  text = 'Calories',
  color = '#7755ff'
}: Partial<CircleTimerProps>) => {
  return (
    <div className="circle-wrapper">
      <h4 className="text">{text}</h4>
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
          trailColor: '#35383f',
          backgroundColor: '#3e98c7'
        })}
      />
    </div>
  );
};

export { CircleChart };
