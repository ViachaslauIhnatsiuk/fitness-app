import React, { FC, useCallback, useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { ExerciseActive } from '../exerciseActive/ExerciseActive';
import { TrainingResult } from '../trainingResult/TrainingResult';
import { TrainingPreparation } from '../trainingPreparation/TrainingPreparation';
import { TrainingRest } from '../trainingRest/TrainingRest';
import { IExercise, WorkoutPath } from '../../../models/Workout';
import { useStorage } from '../../../hooks/useStorage';
import { useTraining } from '../../../hooks/useTraining';
import s from './TrainingActive.module.css';

const TrainingActive: FC = () => {
  const params = useParams();

  const { getTrainingById, trainingById } = useTraining();
  const [currentExercise, setCurrentExercise] = useState<IExercise>();
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [isTrainingFinished, setTrainingIsFinished] = useState<boolean>(false);
  const [isPreparationStart, setIsPreparationStart] = useState<boolean>(true);
  const [isRestStart, setIsRestStart] = useState<boolean>(false);
  const { exerciseGifUrl, getExerciseGifUrl, setExerciseGifUrl } = useStorage();
  const [statistic, setStatistic] = useState({
    cal: 0,
    time: 0,
    calPerExercise: 0,
    timePerExercise: 0
  });
  const trainingId = params.trainingId as string;
  const redirectPath = `${WorkoutPath.trainings}/${trainingId}/`;

  useEffect(() => {
    if (trainingId) getTrainingById(trainingId).catch((error: Error) => error);
  }, [getTrainingById, trainingId]);

  useEffect(
    function setInitialStatisticData() {
      if (trainingById) {
        const { exercises, cal } = trainingById;
        const totalTime = exercises.reduce((sum, { time }) => sum + time, 0);
        if (!statistic.cal) {
          statistic.cal = cal;
          statistic.time = totalTime;
          statistic.calPerExercise = Math.floor(cal / exercises.length - 1);
          statistic.timePerExercise = Math.floor(totalTime / exercises.length - 1);
          setStatistic(statistic);
        }
      }
    },
    [statistic, trainingById]
  );

  useEffect(() => {
    if (trainingById) {
      const { exercises } = trainingById;
      setCurrentExercise(exercises[currentPosition]);
    }
  }, [currentPosition, trainingById]);

  useEffect(() => {
    if (currentExercise?.title) {
      const { title } = currentExercise;
      getExerciseGifUrl(title).catch((error: Error) => error);
    }
  }, [currentExercise, getExerciseGifUrl]);

  const onUpdatePreparationTimer = (remainingTime: number) => {
    if (remainingTime === 0) {
      setIsPreparationStart(false);
    }
  };

  const onUpdateRestTimer = (remainingTime: number) => {
    if (remainingTime === 0) {
      setIsRestStart(false);
    }
  };

  const onSkipPreparationHandler = () => {
    setIsPreparationStart(false);
  };

  const onSkipRestHandler = () => {
    setIsRestStart(false);
  };

  const onUpdateExerciseTimer = (remainingTime: number) => {
    if (remainingTime === 0) {
      onNextHandler(false);
    }
  };

  const changeNumberOfExercise = useCallback(
    (isPrevBtnClicked = false) => {
      if (trainingById) {
        const { exercises } = trainingById;
        const amountExercise = exercises.length - 1;
        let nextPosition = currentPosition + 1;
        if (isPrevBtnClicked) {
          nextPosition = currentPosition >= 1 ? currentPosition - 1 : currentPosition;
        }

        if (nextPosition > amountExercise) {
          setTrainingIsFinished(true);
        } else {
          setCurrentPosition(nextPosition);
        }
      }
    },
    [currentPosition, trainingById]
  );

  const onNextHandler = useCallback(
    (isNextBtnClicked = true) => {
      if (trainingById) {
        setExerciseGifUrl('');
        changeNumberOfExercise();

        if (isNextBtnClicked) {
          setStatistic({ ...statistic, cal: (statistic.cal -= statistic.calPerExercise) });
          setStatistic({ ...statistic, time: (statistic.time -= statistic.timePerExercise) });
        }

        setIsRestStart(true);
      }
    },
    [changeNumberOfExercise, setExerciseGifUrl, statistic, trainingById]
  );

  const onPrevHandler = () => {
    setExerciseGifUrl('');
    changeNumberOfExercise(true);
    setIsRestStart(true);
  };

  return (
    <div className={s.wrapper}>
      <Link className={s.return} to={redirectPath}>
        <BsArrowLeft className={s.icon} />
      </Link>
      {isTrainingFinished ? (
        <TrainingResult statisticsOfTraining={statistic} />
      ) : (
        <div className={s.active}>
          {isPreparationStart && (
            <TrainingPreparation
              onSkipHandler={onSkipPreparationHandler}
              onUpdate={onUpdatePreparationTimer}
            />
          )}
          {!isPreparationStart && (
            <div className={s.exercises}>
              {isRestStart ? (
                <TrainingRest
                  onSkipHandler={onSkipRestHandler}
                  nextExercise={currentExercise as IExercise}
                  exerciseGifUrl={exerciseGifUrl}
                  onUpdate={onUpdateRestTimer}
                />
              ) : (
                <div>
                  {currentExercise && (
                    <ExerciseActive
                      exercise={currentExercise}
                      exerciseGifUrl={exerciseGifUrl}
                      onNextHandler={onNextHandler}
                      onPrevHandler={onPrevHandler}
                      onUpdate={onUpdateExerciseTimer}
                      currentPosition={currentPosition}
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
