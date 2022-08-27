import React, { FC } from 'react';
import { IoMdClose } from 'react-icons/io';
import { NotificationProps } from './models';
import s from './Notification.module.css';

const Notification: FC<NotificationProps> = ({ text, handler }) => {
  return (
    <div className={s.notification}>
      <div className={s.text}>{text}</div>
      <IoMdClose className={s.close} onClick={() => handler(false)} />
    </div>
  );
};

export { Notification };
