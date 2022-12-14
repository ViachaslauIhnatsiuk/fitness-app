import React, { FC } from 'react';
import { BsGithub } from 'react-icons/bs';
import { ReactComponent as Logo } from '../../assets/rs-logo.svg';
import s from './Footer.module.css';

const Footer: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.year}>2022</div>
      <div className={s.githubs}>
        <div className={s.github}>
          <BsGithub />
          <a
            href="https://github.com/ViachaslauIhnatsiuk"
            target="_blank"
            rel="noreferrer"
            className={s.ref}
          >
            ViachaslauIhnatsiuk
          </a>
        </div>
        <div className={s.github}>
          <BsGithub />
          <a
            href="https://github.com/Dauhaliavets"
            target="_blank"
            className={s.ref}
            rel="noreferrer"
          >
            Dauhaliavets
          </a>
        </div>
        <div className={s.github}>
          <BsGithub />
          <a
            href="https://github.com/GlebKolyano"
            target="_blank"
            className={s.ref}
            rel="noreferrer"
          >
            GlebKolyano
          </a>
        </div>
      </div>
      <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
        <Logo className={s.logo} />
      </a>
    </div>
  );
};

export { Footer };
