import React, { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import s from './TrainingCreate.module.css';
import { IExercise, IWorkout, WorkoutFilterByLevel, WorkoutPath } from '../../../models/Workout';
import { useAppSelector } from '../../../store/model';
import { selectProfile, selectTrainings } from '../../../store/selectors';
import { addCustomTraining } from '../../../store/slices/profileSlice';
import { useAppDispatch } from '../../../store/store';
import { options } from './constants';
import { Exercises } from './exercises/Exercises';

const TrainingCreate = () => {
  const dispatch = useAppDispatch();
  const { trainings } = useAppSelector(selectTrainings);
  const {
    currentUser: { customTrainings }
  } = useAppSelector(selectProfile);
  const [level, setLevel] = useState<WorkoutFilterByLevel>(WorkoutFilterByLevel.beginner);
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [selectedExercises, setSelectedExercises] = useState<IExercise[]>([]);

  const addExerciseToCollection = (exercise: IExercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(selectedExercises.filter((item) => item !== exercise));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const selectLevelHandler = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setLevel(value as WorkoutFilterByLevel);
  };

  const changeTitleHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  };

  const createCustomTrainingHandler = () => {
    if (selectedExercises.length < 5) {
      setError(true);
    } else {
      const trainingId = customTrainings.length + trainings.length + 1;
      const customTraining: IWorkout = {
        cal: selectedExercises.length * 9,
        id: trainingId,
        level,
        title,
        exercises: selectedExercises
      };
      dispatch(addCustomTraining(customTraining));
      setError(false);
      setTitle('');
      setSelectedExercises([]);
      setLevel(WorkoutFilterByLevel.beginner);
    }
  };

  return (
    <div className={s.wrapper}>
      <Link className={s.return} to={WorkoutPath.trainings}>
        <BsArrowLeft className={s.icon} />
      </Link>
      <h1 className={s.title}>Create custom traning</h1>
      <div className={s.form}>
        <div className={s.input_wrapper}>
          <input
            type="text"
            className={s.input}
            placeholder="Enter title"
            value={title}
            onChange={changeTitleHandler}
          />
        </div>
        <select
          className={s.select}
          onChange={selectLevelHandler}
          name="level"
          defaultValue={WorkoutFilterByLevel.beginner}
        >
          {options.map(({ label, value }) => {
            return (
              <option key={uuidv4()} className={s.option} value={value}>
                {label}
              </option>
            );
          })}
        </select>
        <button
          className={s.button}
          type="button"
          disabled={!title}
          onClick={createCustomTrainingHandler}
        >
          create
        </button>
      </div>
      {error && <h4 className={s.error}>To create a workout, you need at least 5 exercises</h4>}
      <Exercises selectedExercises={selectedExercises} onClickHandler={addExerciseToCollection} />
    </div>
  );
};

export { TrainingCreate };
