import { Dispatch, SetStateAction } from 'react';

export interface AvatarProps {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
}
