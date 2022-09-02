import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSecondPartPath } from '../../../helpers/getSecondPartPath';
import s from './WorkoutNavbar.module.css';

const WorkoutNavbar = () => {
  const location = useLocation();
  const secondPart = getSecondPartPath(location.pathname);

  const videosClassName = secondPart === 'videos' ? s.link_active : s.link;
  const trainingsClassName = secondPart === 'trainings' ? s.link_active : s.link;

  return (
    <div className={s.links}>
      <Link to="videos" className={videosClassName}>
        Video trainings
      </Link>
      <Link to="trainings" className={trainingsClassName}>
        Trainings
      </Link>
    </div>
  );
};

export { WorkoutNavbar };
