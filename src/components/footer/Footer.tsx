import React, { FC } from 'react';
import logo from '../../assets/rs-logo.svg';
import s from './Footer.module.css';

const Footer: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.githubs}>
        <a
          href="https://github.com/ViachaslauIhnatsiuk"
          target="_blank"
          className={s.github}
          rel="noreferrer"
        >
          ViachaslauIhnatsiuk
        </a>
        <a
          href="https://github.com/Dauhaliavets"
          target="_blank"
          className={s.github}
          rel="noreferrer"
        >
          Dauhaliavets
        </a>
        <a
          href="https://github.com/GlebKolyano"
          target="_blank"
          className={s.github}
          rel="noreferrer"
        >
          GlebKolyano
        </a>
      </div>
      <div className={s.year}>2022</div>
      <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
        <img className={s.logo} src={logo} alt="rolling-scopes-school logo" />
      </a>
    </div>
  );
};

export { Footer };
