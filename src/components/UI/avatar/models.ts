import { Dispatch, SetStateAction } from 'react';

export interface AvatarProps {
  setImageUrl: Dispatch<SetStateAction<string>>;
}
