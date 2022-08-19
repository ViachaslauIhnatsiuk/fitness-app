import React, { FC } from 'react';
import { ExerciseActiveProps } from './models';

const ExerciseActive: FC<ExerciseActiveProps> = ({
  exercise: { description, img, time, title }
}) => {
  return (
    <div>
      <img src={img} alt="exercise" />
      <br />
      <h4>{title}</h4>
      <span>time: {time}</span>
      <br />
      <h4>{description}</h4>
    </div>
  );
};

export { ExerciseActive };
