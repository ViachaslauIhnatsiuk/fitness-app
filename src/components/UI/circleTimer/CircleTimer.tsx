import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import s from './CircleTimer.module.css';
import { Button } from '../button/Button';
import { CircleTimerProps } from './models';

const CircleTimer = ({
  duration = 0,
  onClick,
  colors,
  btnTitle,
  size = 180,
  fontSize = 40,
  strokeWidth = 12
}: Partial<CircleTimerProps>) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const onClickHandler = () => {
    if (onClick) onClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={s.timer}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={colors || ['#7C00FF', '#7C00FF']}
        colorsTime={[0, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        size={size}
        strokeWidth={strokeWidth}
      >
        {({ remainingTime }) => <p style={{ fontSize }}>{remainingTime}</p>}
      </CountdownCircleTimer>
      {onClick && (
        <Button text={btnTitle} onClick={onClickHandler} isStyled customStyles={s.button} />
      )}
    </div>
  );
};

export { CircleTimer };
