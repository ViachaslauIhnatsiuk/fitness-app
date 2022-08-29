import { ChangeEvent } from 'react';

type RadioProps = {
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  state?: string;
};

export type { RadioProps };
