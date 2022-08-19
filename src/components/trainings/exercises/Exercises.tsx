import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { useLocation, useParams } from 'react-router-dom';
import s from './Exercises.module.css';
import { IExercise, ITraining, Path } from '../models';
import { Button } from '../../UI/button/Button';
import { ExerciseCard } from '../exerciseCard/ExerciseCard';

const Exercises: FC = () => {
  const { pathname } = useLocation();
  const [exercisesArr, setExercises] = useState<IExercise[]>([]);
  const { trainingId } = useParams();
  const redirectPath = `${pathname}active`;

  useEffect(() => {
    const isCurrentExercises = (id: number) => {
      if (trainingId === String(id)) return true;
      return false;
    };

    (async () => {
      const response = await fetch('/data/trainings.json');
      const data = (await response.json()) as ITraining[];
      const { exercises } = data.find(({ id }) => isCurrentExercises(id)) as ITraining;
      setExercises(exercises);
    })().catch(() => {});
  }, [trainingId]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Button path={Path.trainings} icon={<IoChevronBackCircleOutline />} />
        <h3>Exercises id: {trainingId}</h3>
      </div>
      <div className={s.exercises}>
        {exercisesArr.map((exercise) => {
          return <ExerciseCard key={uuidv4()} exercise={exercise} />;
        })}
      </div>
      <Button path={redirectPath} text="start" isStyled />
    </div>
  );
};

export { Exercises };