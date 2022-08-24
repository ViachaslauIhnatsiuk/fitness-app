import React, { FC, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import s from './Welcome.module.css';

const Welcome: FC = () => {
  const [greeting, setGreeting] = useState<boolean>(false);

  return (
    <div className={s.wrapper}>
      <div className={s.greeting}>Welcome to</div>
      <Logo className={s.logo} />
      {greeting ? (
        <div className={s.buttons}>
          <button type="button" className={s.button}>
            Sign in
          </button>
          <button type="button" className={s.button}>
            Sign up
          </button>
        </div>
      ) : (
        <button type="button" className={s.start} onClick={() => setGreeting(true)}>
          Get started
        </button>
      )}
    </div>
  );
};

export { Welcome };
