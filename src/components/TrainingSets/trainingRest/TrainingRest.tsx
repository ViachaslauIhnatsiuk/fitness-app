import React, { FC, useRef } from 'react';
import { Audio } from '../../../models/audio';
import { useAppSelector } from '../../../store/model';
import { selectSettings } from '../../../store/selectors';
import { Button } from '../../UI/button/Button';
import { CircleTimer } from '../../UI/circleTimer/CircleTimer';
import { CustomAudio } from '../../UI/customAudio/CustomAudio';
import Loader from '../../UI/loader/Loader';
import { REST_TIME } from '../constants';
import { TrainingRestProps } from './models';
import s from './TrainingRest.module.css';

const TrainingRest: FC<TrainingRestProps> = ({
  onSkipHandler,
  exerciseGifUrl,
  nextExercise: { title },
  onUpdate
}) => {
  const { isSoundOn } = useAppSelector(selectSettings);
  const auidoTimer = useRef<HTMLAudioElement>(null);
  const auidoRest = useRef<HTMLAudioElement>(null);

  const playSound = (remainingTime: number) => {
    if (remainingTime === 5 && auidoTimer.current && isSoundOn) {
      auidoTimer.current.volume = 0.4;
      auidoTimer.current.play().catch(() => {});
    }
    if (remainingTime === REST_TIME - 1 && auidoRest.current && isSoundOn) {
      auidoRest.current.volume = 0.4;
      auidoRest.current.play().catch(() => {});
    }
  };

  return (
    <div className={s.rest}>
      <div className={s.timer}>
        <h1>Take a Rest!</h1>
        <CircleTimer
          duration={REST_TIME}
          colors={['#7755ff', '#7755ff']}
          size={80}
          strokeWidth={4}
          fontSize={28}
          onUpdate={onUpdate}
          playSound={playSound}
        />
      </div>
      <div className={s.info}>
        <h2 className={s.title}>
          Next exercise: <i>{title}</i>
        </h2>
        {!exerciseGifUrl ? (
          <div className={s.loader}>
            <Loader />
          </div>
        ) : (
          <img className={s.image} src={exerciseGifUrl} alt="exercise" />
        )}
      </div>
      <Button text="Skip Rest" onClick={onSkipHandler} isStyled customStyles={s.button} />
      <CustomAudio ref={auidoTimer} path={Audio.timer} />
      <CustomAudio ref={auidoRest} path={Audio.rest} />
    </div>
  );
};

export { TrainingRest };
