import React, { FC, useCallback, useEffect, useState } from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { useTimer } from '../../../hooks/useTimer';
import { Button } from '../../UI/button/Button';
import s from './TrainingActive.module.css';
import { EXERCISE_INITIAL_TIME, PREPARATION_TIME, REST_TIME } from '../constants';
import { ExerciseActive } from '../exerciseActive/ExerciseActive';

import { TrainingResult } from '../trainingResult/TrainingResult';
import { TrainingPreparation } from '../trainingPreparation/TrainingPreparation';
import { TrainingRest } from '../trainingRest/TrainingRest';
import { IExercise, WorkoutPath } from '../../../models/Workout';
import { useStorage } from '../../../hooks/useStorage';
import { useTraining } from '../../../hooks/useTraining';

const TrainingActive: FC = () => {
  const params = useParams();

  const { getTrainingById, trainingById } = useTraining();
  const [currentExercise, setCurrentExercise] = useState<IExercise>();
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [isNextButtonClicked, setNextButtonClicked] = useState<boolean>(false);
  const [isPrevButtonClicked, setPrevButtonClicked] = useState<boolean>(false);
  const [isTrainingFinished, setTrainingIsFinished] = useState<boolean>(false);
  const [isLastExercise, setIsLastExercise] = useState<boolean>(false);
  const { exerciseGifUrl, getExerciseGifUrl } = useStorage();
  const [statistic, setStatistic] = useState({ cal: 0, time: 0, calPerExercise: 0 });
  const trainingId = params.trainingId as string;
  const redirectPath = `${WorkoutPath.trainings}/${trainingId}/`;

  useEffect(() => {
    if (trainingId) getTrainingById(trainingId).catch((error: Error) => error);
  }, [getTrainingById, trainingId]);

  useEffect(
    function setExercise() {
      if (trainingById) {
        const { exercises, cal } = trainingById;
        if (!statistic.cal) {
          statistic.cal = cal;
          statistic.calPerExercise = Math.round(cal / exercises.length);
          setStatistic(statistic);
        }
        setCurrentExercise(exercises[currentPosition]);
      }
    },
    [currentPosition, statistic, trainingById]
  );

  // timers
  const {
    isRunning: isExerciseRunning,
    counter: counterOfExerciseTimer,
    start: startExerciseTimer,
    stop: stopExerciseTimer,
    pause: pauseExerciseTimer,
    setCounter: setExerciseCounter
  } = useTimer(EXERCISE_INITIAL_TIME);

  const {
    isRunning: isRestTimerRunning,
    counter: counterOfRestTimer,
    start: startRestTimer,
    stop: stopRestTimer,
    setCounter: setRestCounter
  } = useTimer(REST_TIME);

  const {
    isRunning: isPreparationTimerRunning,
    counter: counterOfPreparationTimer,
    start: startPreparationTimer,
    stop: stopPreparationTimer,
    setCounter: setPreparationCounter
  } = useTimer(PREPARATION_TIME);

  const startExercise = useCallback(() => {
    stopExerciseTimer();
    setExerciseCounter(currentExercise?.time as number);
    startExerciseTimer();
  }, [currentExercise?.time, setExerciseCounter, startExerciseTimer, stopExerciseTimer]);

  const changeNumberOfExercise = useCallback(() => {
    if (trainingById) {
      const { exercises } = trainingById;
      const amountExercise = exercises.length - 1;
      let nextPosition = currentPosition + 1;
      if (isPrevButtonClicked) {
        nextPosition = currentPosition > 2 ? currentPosition - 2 : currentPosition;
        setPrevButtonClicked(false);
      }

      if (nextPosition > amountExercise) {
        setIsLastExercise(true);
        setTrainingIsFinished(true);
      } else {
        setCurrentPosition(nextPosition);
        setExerciseCounter(0);
      }
    }
  }, [currentPosition, isPrevButtonClicked, setExerciseCounter, trainingById]);

  useEffect(
    function startTimerBeforeTraining() {
      startPreparationTimer();
    },
    [startPreparationTimer, stopPreparationTimer]
  );

  useEffect(
    function startTrainingAterPreparationTimer() {
      if (counterOfPreparationTimer < 1) {
        startExercise();
      }
    },
    [isPreparationTimerRunning, counterOfPreparationTimer, startExercise]
  );

  useEffect(
    function updateExerciseTimer() {
      setExerciseCounter(currentExercise?.time as number);
    },
    [currentExercise, setExerciseCounter]
  );

  // handlers
  const onNextHandler = useCallback(() => {
    if (trainingById) {
      changeNumberOfExercise();
      setNextButtonClicked(true);
      setStatistic({ ...statistic, cal: (statistic.cal -= statistic.calPerExercise) });
    }
  }, [changeNumberOfExercise, statistic, trainingById]);

  const onPrevHandler = () => {
    const nextPosition = currentPosition > 0 ? currentPosition - 1 : currentPosition;
    setCurrentPosition(nextPosition);
    setPrevButtonClicked(true);
    setExerciseCounter(0);
  };

  const onSkipHandler = () => {
    setPreparationCounter(0);
    setRestCounter(0);
  };

  // when Timers is over
  useEffect(() => {
    if (isExerciseRunning && counterOfExerciseTimer <= 0) {
      if (!isNextButtonClicked) {
        changeNumberOfExercise();
      }

      startRestTimer();
    }
  }, [
    changeNumberOfExercise,
    isExerciseRunning,
    isLastExercise,
    isNextButtonClicked,
    counterOfExerciseTimer,
    startRestTimer,
    statistic
  ]);

  useEffect(() => {
    if (!isExerciseRunning && counterOfRestTimer <= 0) {
      startExercise();
      stopRestTimer();
      setNextButtonClicked(false);
    }
  }, [isExerciseRunning, onNextHandler, counterOfRestTimer, startExercise, stopRestTimer]);

  useEffect(() => {
    if (currentExercise?.title) {
      const { title } = currentExercise;
      getExerciseGifUrl(title).catch((error: Error) => error);
    }
  }, [currentExercise, getExerciseGifUrl]);

  return (
    <div className={s.wrapper}>
      <Button path={redirectPath} icon={<IoChevronBackCircleOutline />} />
      {isTrainingFinished ? (
        <TrainingResult statisticsOfTraining={statistic} />
      ) : (
        <div className={s.active}>
          {isPreparationTimerRunning && <TrainingPreparation onSkipHandler={onSkipHandler} />}
          {!isPreparationTimerRunning && (
            <div className={s.exercises}>
              {isRestTimerRunning ? (
                <TrainingRest
                  onSkipHandler={onSkipHandler}
                  nextExercise={currentExercise as IExercise}
                  exerciseGifUrl={exerciseGifUrl}
                />
              ) : (
                <div>
                  {currentExercise && (
                    <ExerciseActive
                      exercise={currentExercise}
                      exerciseGifUrl={exerciseGifUrl}
                      onClickTimerHandler={pauseExerciseTimer}
                      onNextHandler={onNextHandler}
                      onPrevHandler={onPrevHandler}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { TrainingActive };
