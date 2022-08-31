import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import s from './CircleChart.module.css';
import { CircleTimerProps } from './models';

const CircleChart = ({
  maxValue = 100,
  currentValue = 0,
  size = 180,
  fontSize = 60,
  strokeWidth = 12,
  title = 'Cal',
  color = '#FBD026'
}: Partial<CircleTimerProps>) => {
  return (
    <div className={s.timer}>
      <CountdownCircleTimer
        isPlaying={false}
        duration={maxValue}
        colors={[color, color] || ['#7C00FF', '#7C00FF']}
        colorsTime={[0, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        size={size}
        strokeWidth={strokeWidth}
        initialRemainingTime={currentValue}
        rotation="counterclockwise"
      >
        {({ remainingTime }) => (
          <div style={{ fontSize, fontWeight: 'bold' }} className={s.title}>
            <p>{remainingTime}</p>
            <p style={{ fontSize: 30, fontWeight: 'normal' }}>{title}</p>
          </div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};

export { CircleChart };
