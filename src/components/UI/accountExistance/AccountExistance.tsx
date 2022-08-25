import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AccountExistanceProps } from './models';
import s from './AccountExistance.module.css';

const AccountExistance: FC<AccountExistanceProps> = ({ title, path, link }) => {
  return (
    <div className={s.account}>
      {title}
      <Link to={`/${path}`} className={s.sign}>
        {link}
      </Link>
    </div>
  );
};

export { AccountExistance };
