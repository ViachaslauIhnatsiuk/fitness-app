import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Button } from '../button/Button';
import { CircleTimerProps } from './models';

const CircleTimer = ({ duration, onClick, colors, btnTitle }: CircleTimerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const onClickHandler = () => {
    if (onClick) onClick();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={colors}
        colorsTime={[0, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
      >
        {({ remainingTime, color }) => <p style={{ color, fontSize: 40 }}>{remainingTime}</p>}
      </CountdownCircleTimer>
      {onClick && <Button text={btnTitle} onClick={onClickHandler} isStyled />}
    </div>
  );
};

export { CircleTimer };
