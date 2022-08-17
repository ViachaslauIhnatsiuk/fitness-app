import React, { FC } from 'react';
import s from './Header.module.css';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header: FC = () => {
  return (
    <div className={s.wrapper}>
      <Logo className={s.logo} />
    </div>
  );
};

export { Header };
