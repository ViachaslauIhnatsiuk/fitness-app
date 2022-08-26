import React, { FC, useEffect, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import {
  auth,
  browserSessionPersistence,
  browserLocalPersistence,
  setPersistence
} from '../../../firebase/firebase';
import s from './RememberMe.module.css';

const RememberMe: FC = () => {
  const [remember, setRemember] = useState<boolean>(false);

  useEffect(() => {
    if (remember) {
      setPersistence(auth, browserLocalPersistence).catch((error: Error) => error);
    } else {
      setPersistence(auth, browserSessionPersistence).catch((error: Error) => error);
    }
  }, [remember]);

  return (
    <div className={s.remember}>
      <button
        type="button"
        className={s.checkbox}
        style={remember ? { background: '#7755ff' } : { background: 'transparent' }}
        onClick={() => setRemember(!remember)}
      >
        {remember && <BsCheckLg className={s.check} />}
      </button>
      <div className={s.text}>Remember me</div>
    </div>
  );
};

export { RememberMe };
