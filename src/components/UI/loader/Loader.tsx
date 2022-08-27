import React, { FC } from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { LoaderProps } from './models';

const Loader: FC<Partial<LoaderProps>> = ({ color = '#7755ff', size = 20, speed = 1 }) => {
  return <PropagateLoader color={color} size={size} speedMultiplier={speed} />;
};

export default Loader;
