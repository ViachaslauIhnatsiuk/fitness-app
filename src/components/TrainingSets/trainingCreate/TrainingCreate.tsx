import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { Exercises } from './exercises/Exercises';
import './TrainingCreate.css';
import { TrainingForm } from './trainingForm/TrainingForm';
import { SelectedExercises } from './selectedExercises/SelectedExercises';
import { WorkoutPath } from '../../../models/Workout';

const TrainingCreate = () => {
  return (
    <div className="create_wrapper">
      <Link className="create_return" to={WorkoutPath.trainings}>
        <BsArrowLeft className="create_icon" />
      </Link>
      <h1 className="create_title">Create custom training</h1>
      <h4 className="create_subtitle">Choose at least 5 exercises to create new training</h4>
      <TrainingForm />
      <div className="create_content">
        <Exercises />
        <SelectedExercises />
      </div>
    </div>
  );
};

export { TrainingCreate };
