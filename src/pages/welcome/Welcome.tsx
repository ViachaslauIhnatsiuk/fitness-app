import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import Loader from '../../components/UI/loader/Loader';
import s from './Welcome.module.css';

const Welcome: FC = () => {
  const [greeting, setGreeting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loader = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(loader);
  }, []);

  return (
    <div className={s.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={s.greeting}>Welcome to</div>
          <Logo className={s.logo} />
          {greeting ? (
            <div className={s.buttons}>
              <Link to="sign-in" className={s.button}>
                Sign in
              </Link>
              <Link to="sign-up" className={s.button}>
                Sign up
              </Link>
            </div>
          ) : (
            <button type="button" className={s.start} onClick={() => setGreeting(true)}>
              Get started
            </button>
          )}
        </>
      )}
    </div>
  );
};

export { Welcome };
