import React, { forwardRef } from 'react';
import { CustomAudioProps } from './models';

const CustomAudio = forwardRef<HTMLAudioElement, CustomAudioProps>(({ path }, ref) => {
  return (
    <audio ref={ref} loop={false}>
      <track kind="captions" />
      <source src={path} type="audio/mpeg" />
    </audio>
  );
});

export { CustomAudio };
