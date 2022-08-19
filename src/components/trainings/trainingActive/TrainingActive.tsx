import React, { useCallback, useEffect, useState } from 'react';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import useTimer from '../../../hooks/useTimer';
import { Button } from '../../UI/button/Button';
import { ExerciseActive } from '../exerciseActive/ExerciseActive';
import { IExercise, ITraining, Path } from '../models';
import { ResultTraining } from '../resultTraining/ResultTraining';

const TrainingActive = () => {
  const params = useParams();

  const [training, setTraining] = useState<ITraining>();
  const [currentExercise, setCurrentExercise] = useState<IExercise>();
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [isNextButtonClicked, setNextButtonClicked] = useState<boolean>(false);
  const [isTrainingFinished, setTrainingIsFinished] = useState<boolean>(false);
  const [isLastExercise, setIsLastExercise] = useState<boolean>(false);

  const trainingId = params.trainingId as string;
  const redirectPath = `${Path.trainings}/${trainingId}/`;

  useEffect(
    function getTraining() {
      const isCurrentTraining = (id: number) => {
        if (trainingId && trainingId === String(id)) return true;
        return false;
      };

      (async () => {
        const response = await fetch('/data/trainings.json');
        const data = (await response.json()) as ITraining[];
        const currentTraining = data.find(({ id }) => isCurrentTraining(id)) as ITraining;
        setTraining(currentTraining);
      })().catch(() => {});
    },
    [trainingId]
  );

  useEffect(
    function setExercise() {
      if (training) {
        const { exercises } = training;
        setCurrentExercise(exercises[currentPosition]);
      }
    },
    [currentPosition, training]
  );

  // timers
  const {
    isRunning: isExerciseRunning,
    seconds: secondsOfExerciseTimer,
    start: startExerciseTimer,
    stop: stopExerciseTimer,
    setSeconds: setExerciseSeconds
  } = useTimer(0);

  const {
    isRunning: isRestTimerRunning,
    seconds: secondsOfRestTimer,
    start: startRestTimer,
    stop: stopRestTimer,
    setSeconds: setRestSeconds
  } = useTimer(10);

  const {
    isRunning: isInitialTimerRunning,
    seconds: secondsOfInitialTimer,
    start: startInitialTimer,
    stop: stopInitialTimer
  } = useTimer(5);

  const startExercise = useCallback(() => {
    stopExerciseTimer();
    setExerciseSeconds(currentExercise?.time as number);
    startExerciseTimer();
  }, [currentExercise?.time, setExerciseSeconds, startExerciseTimer, stopExerciseTimer]);

  useEffect(
    function startTimerBeforeTraining() {
      startInitialTimer();
    },
    [startInitialTimer, stopInitialTimer]
  );

  useEffect(
    function startTrainingAterInitialTimer() {
      if (secondsOfInitialTimer < 1) {
        startExercise();
      }
    },
    [isInitialTimerRunning, secondsOfInitialTimer, startExercise]
  );

  useEffect(
    function updateExerciseTimer() {
      setExerciseSeconds(currentExercise?.time as number);
    },
    [currentExercise, setExerciseSeconds]
  );

  const changeNumberOfExercise = useCallback(() => {
    if (training) {
      const { exercises } = training;
      const amountExercise = exercises.length - 1;
      const nextPosition = currentPosition + 1;

      if (nextPosition > amountExercise) {
        setIsLastExercise(true);
        setTrainingIsFinished(true);
      } else {
        setCurrentPosition(nextPosition);
        setExerciseSeconds(0);
      }
    }
  }, [currentPosition, setExerciseSeconds, training]);

  // handlers
  const onNextHandler = useCallback(() => {
    if (training) {
      changeNumberOfExercise();
      setNextButtonClicked(true);
    }
  }, [changeNumberOfExercise, training]);

  const onPrevHandler = () => {
    const nextPosition = currentPosition > 0 ? currentPosition - 1 : currentPosition;
    setCurrentPosition(nextPosition - 1);
    setExerciseSeconds(0);
  };

  const onSkipHandler = () => {
    setRestSeconds(0);
  };

  // when EXERCISE TIMER is over
  useEffect(() => {
    if (isExerciseRunning && secondsOfExerciseTimer === 0) {
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
    secondsOfExerciseTimer,
    startRestTimer
  ]);

  // when REST TIMER is over
  useEffect(() => {
    if (!isExerciseRunning && secondsOfRestTimer === 0) {
      startExercise();
      stopRestTimer();
      setNextButtonClicked(false);
    }
  }, [isExerciseRunning, onNextHandler, secondsOfRestTimer, startExercise, stopRestTimer]);

  return (
    <div>
      <div>
        <Button path={redirectPath} icon={<IoChevronBackCircleOutline />} />
      </div>
      {isTrainingFinished ? (
        <ResultTraining />
      ) : (
        <div>
          {isInitialTimerRunning && (
            <div>
              PREPARE: {secondsOfInitialTimer}
              <br />
            </div>
          )}

          {!isInitialTimerRunning && (
            <div>
              <p>{training?.title}</p>
              <p>{training?.level}</p>

              {isRestTimerRunning ? (
                <div>
                  REST TIMER: {secondsOfRestTimer}
                  <Button text="skip" onClick={onSkipHandler} isStyled />
                </div>
              ) : (
                <div>
                  {currentExercise && <ExerciseActive exercise={currentExercise} />}
                  <p>timer: {secondsOfExerciseTimer}</p>
                  <Button text="prev" onClick={onPrevHandler} isStyled />
                  <Button text="next" onClick={onNextHandler} isStyled />
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
