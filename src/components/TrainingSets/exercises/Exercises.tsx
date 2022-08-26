import React, { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useLocation, useParams } from 'react-router-dom';
import s from './Exercises.module.css';
import { Button } from '../../UI/button/Button';
import { ExerciseCard } from '../exerciseCard/ExerciseCard';
import { WorkoutPath } from '../../../models/Workout';
import { useTraining } from '../../../hooks/useTraining';
import Loader from '../../UI/loader/Loader';

const Exercises: FC = () => {
  const { pathname } = useLocation();
  const { trainingId } = useParams();
  const { getExercisesById, exercisesById, isLoading } = useTraining();

  const redirectPath = `${pathname}active`;

  useEffect(() => {
    if (trainingId) getExercisesById(trainingId).catch((error: Error) => error);
  }, [getExercisesById, trainingId]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Button path={WorkoutPath.trainings} icon={<IoChevronBackCircleOutline />} />
        <h2>Workout Activity</h2>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={s.exercises}>
            {exercisesById?.map((exercise) => {
              return <ExerciseCard key={uuidv4()} exercise={exercise} />;
            })}
          </div>
          <Button path={redirectPath} text="START" isStyled customStyles={s.button} />
        </>
      )}
    </div>
  );
};

export { Exercises };
