import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useLocation, useParams } from 'react-router-dom';
import s from './Exercises.module.css';
import { Button } from '../../UI/button/Button';
import { ExerciseCard } from '../exerciseCard/ExerciseCard';
import { IExercise, IWorkout, WorkoutPath } from '../../../models/Workout';
import { useAppSelector } from '../../../store/model';
import { selectTrainings } from '../../../store/selectors';

const Exercises: FC = () => {
  const { pathname } = useLocation();
  const { trainingId } = useParams();
  const { trainings } = useAppSelector(selectTrainings);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const redirectPath = `${pathname}active`;

  useEffect(() => {
    const { exercises: exercisesData } = trainings.find(
      ({ id }) => Number(trainingId) === id
    ) as IWorkout;

    setExercises(exercisesData);
  }, [trainingId, trainings]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Button path={WorkoutPath.trainings} icon={<IoChevronBackCircleOutline />} />
        <h2>Workout Activity</h2>
      </div>
      <div className={s.exercises}>
        {exercises.map((exercise) => {
          return <ExerciseCard key={uuidv4()} exercise={exercise} />;
        })}
      </div>
      <Button path={redirectPath} text="START" isStyled customStyles={s.button} />
    </div>
  );
};

export { Exercises };
