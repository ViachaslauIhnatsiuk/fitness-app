import React, { ChangeEvent, useState, FC } from 'react';
import Select, { SingleValue } from 'react-select';
import { IWorkout } from '../../../../models/Workout';
import { useAppSelector } from '../../../../store/model';
import { selectCustomTraining } from '../../../../store/selectors';
import { resetCustomTrainingState } from '../../../../store/slices/customTrainingSlice';
import { addCustomTraining } from '../../../../store/slices/profileSlice';
import { useAppDispatch } from '../../../../store/store';
import { options } from '../constants';
import { IOption } from '../models';
import './TrainingForm.css';

const TrainingForm: FC = () => {
  const dispatch = useAppDispatch();
  const { exercises } = useAppSelector(selectCustomTraining);
  const [level, setLevel] = useState<string>('beginner');
  const [title, setTitle] = useState<string>('');

  const changeTitleHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  };

  const createCustomTrainingHandler = () => {
    const customTraining: IWorkout = {
      cal: exercises.length * 9,
      id: Date.now(),
      level,
      title,
      exercises
    };
    dispatch(addCustomTraining(customTraining));
    setTitle('');
    dispatch(resetCustomTrainingState());
    setLevel('beginner');
  };

  const getValue = () => {
    return level ? options.find((item) => item.value === level) : [];
  };

  const onChange = (selectedOption: SingleValue<string | IOption>) => {
    setLevel((selectedOption as IOption).value);
  };

  return (
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
            backgroundColor: exercises.length < 5 || !title ? '#35383f' : '#7755ff'
          }}
          className="create_button"
          type="button"
          disabled={exercises.length < 5 || !title}
          onClick={createCustomTrainingHandler}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export { TrainingForm };
