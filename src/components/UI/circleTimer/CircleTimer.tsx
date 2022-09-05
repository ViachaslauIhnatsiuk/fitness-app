import React, { useCallback, useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Button } from '../button/Button';
import { CircleTimerProps } from './models';
import s from './CircleTimer.module.css';
import { useAppSelector } from '../../../store/model';
import { selectSettings } from '../../../store/selectors';
import { REST_TIME } from '../../TrainingSets/constants';

const CircleTimer = ({
  duration = 0,
  onClick,
  colors,
  btnTitle,
  size = 180,
  fontSize = 40,
  strokeWidth = 9,
  onUpdate,
  isTimerCanPause = false,
  playSound,
  trailColor = '#ffffff'
}: Partial<CircleTimerProps>) => {
  const { isSoundOn } = useAppSelector(selectSettings);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const onClickHandler = useCallback(() => {
    if (onClick) onClick();
    setIsPlaying(!isPlaying);
  }, [isPlaying, onClick]);

  const onUpdateHandler = (remainingTime: number) => {
    if (onUpdate) onUpdate(remainingTime);
    if (remainingTime === REST_TIME - 1 && playSound && isSoundOn) playSound(remainingTime);
    if (remainingTime === 5 && playSound && isSoundOn) playSound(remainingTime);
  };

  const onKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === ' ') onClickHandler();
    },
    [onClickHandler]
  );

  useEffect(() => {
    document.body.addEventListener('keydown', onKeyDown);

    return (): void => {
      document.body.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className={s.timer}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        trailColor={trailColor}
        duration={duration}
        colors={colors || ['#7C00FF', '#7C00FF']}
        colorsTime={[0, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        size={size}
        strokeWidth={strokeWidth}
        onUpdate={onUpdateHandler}
      >
        {({ remainingTime }) => <p style={{ fontSize }}>{remainingTime}</p>}
      </CountdownCircleTimer>
      {isTimerCanPause && (
        <Button
          text={isPlaying ? btnTitle : 'PLAY'}
          onClick={onClickHandler}
          isStyled
          customStyles={s.button}
        />
      )}
    </div>
  );
};

export { CircleTimer };
