import { Dispatch, SetStateAction } from 'react';

export interface NotificationProps {
  text: string;
  handler: Dispatch<SetStateAction<boolean>>;
}
