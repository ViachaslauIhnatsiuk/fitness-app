import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useLocation, useParams } from 'react-router-dom';
import s from './Exercises.module.css';
import { Button } from '../../UI/button/Button';
import { ExerciseCard } from '../exerciseCard/ExerciseCard';
import { IExercise, WorkoutPath } from '../../../models/Workout';
import TrainingService from '../../../services/TrainingService';

const Exercises: FC = () => {
  const { pathname } = useLocation();
  const { trainingId } = useParams();
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const redirectPath = `${pathname}active`;

  useEffect(() => {
    (async () => {
      const exercisesById = TrainingService.getExercisesById(Number(trainingId));
      setExercises(await exercisesById);
    })().catch((error: Error) => error);
  }, [trainingId]);

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
