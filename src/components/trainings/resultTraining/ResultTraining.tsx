import React from 'react';
import { Button } from '../../UI/button/Button';
import { Path } from '../models';

const ResultTraining = () => {
  return (
    <div>
      <h2>Congratulations!</h2>
      <p>You have completed the workout!</p>
      <Button path={Path.trainings} text="Next to Another Workout" isStyled />
      <Button path={Path.home} text="Home" isStyled />
    </div>
  );
};

export { ResultTraining };
