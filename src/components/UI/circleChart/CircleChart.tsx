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
  color = '#7755ff',
  isThousands = false,
  isTime = false
}: Partial<CircleTimerProps>) => {
  let isMinutes = false;
  if (isTime) {
    if (currentValue < 3600) {
      currentValue = Math.floor(currentValue / 60);
      isMinutes = true;
    } else {
      currentValue = Number((currentValue / 3600).toFixed(1));
    }
  } else if (String(currentValue).split('').length >= 4) {
    currentValue = Number((currentValue / 1000).toFixed(1));
    isThousands = true;
  }

  return (
    <div className="circle-wrapper">
      <h4 className="text">{isMinutes ? 'Minutes' : text}</h4>
      <CircularProgressbar
        strokeWidth={strokeWidth}
        minValue={0}
        maxValue={maxValue}
        value={currentValue}
        text={isThousands ? `${currentValue}k` : `${currentValue}`}
        styles={buildStyles({
          strokeLinecap: 'round',
          textSize: `${fontSize}px`,
          pathTransitionDuration: 0.5,
          pathColor: color,
          textColor: 'var(--main-font)',
          trailColor: 'var(--trail)',
          backgroundColor: '#3e98c7'
        })}
      />
    </div>
  );
};

export { CircleChart };
