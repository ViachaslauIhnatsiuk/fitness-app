import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import Select, { SingleValue } from 'react-select';
import { IExercise, IWorkout, WorkoutPath } from '../../../models/Workout';
import { useAppSelector } from '../../../store/model';
import { selectProfile, selectTrainings } from '../../../store/selectors';
import { addCustomTraining } from '../../../store/slices/profileSlice';
import { useAppDispatch } from '../../../store/store';
import { Exercises } from './exercises/Exercises';
import { IOption } from './models';
import { options } from './constants';
import './TrainingCreate.css';

const TrainingCreate = () => {
  const dispatch = useAppDispatch();
  const { trainings } = useAppSelector(selectTrainings);
  const {
    currentUser: { customTrainings }
  } = useAppSelector(selectProfile);
  const [level, setLevel] = useState<string>('beginner');
  const [title, setTitle] = useState<string>('');
  const [selectedExercises, setSelectedExercises] = useState<IExercise[]>([]);

  const addExerciseToCollection = (exercise: IExercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(selectedExercises.filter((item) => item !== exercise));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const changeTitleHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  };

  const createCustomTrainingHandler = () => {
    const trainingId = customTrainings.length + trainings.length + 1;
    const customTraining: IWorkout = {
      cal: selectedExercises.length * 9,
      id: trainingId,
      level,
      title,
      exercises: selectedExercises
    };
    dispatch(addCustomTraining(customTraining));
    setTitle('');
    setSelectedExercises([]);
    setLevel('beginner');
  };

  const getValue = () => {
    return level ? options.find((item) => item.value === level) : [];
  };

  const onChange = (selectedOption: SingleValue<string | IOption>) => {
    setLevel((selectedOption as IOption).value);
  };

  return (
    <div className="create_wrapper">
      <Link className="create_return" to={WorkoutPath.trainings}>
        <BsArrowLeft className="create_icon" />
      </Link>
      <h1 className="create_title">Create custom training</h1>
      <h4 className="create_subtitle">Choose at least 5 exercises to create new training</h4>
      <div className="create_form">
        <div className="create_input_wrapper">
          <input
            type="text"
            className="create_input"
            placeholder="Enter title"
            value={title}
            onChange={changeTitleHandler}
          />
        </div>
        <div className="create_buttons">
          <Select
            classNamePrefix="selected"
            onChange={onChange}
            value={getValue()}
            options={options}
            isSearchable={false}
          />
          <button
            style={{
              backgroundColor: selectedExercises.length < 5 || !title ? '#35383f' : '#7755ff'
            }}
            className="create_button"
            type="button"
            disabled={selectedExercises.length < 5 || !title}
            onClick={createCustomTrainingHandler}
          >
            Create
          </button>
        </div>
      </div>
      <Exercises selectedExercises={selectedExercises} onClickHandler={addExerciseToCollection} />
    </div>
  );
};

export { TrainingCreate };
