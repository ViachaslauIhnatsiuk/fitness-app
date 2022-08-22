import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import s from './CustomLink.module.css';
import { CustomLinkProps } from './model';

const CustomLink: FC<CustomLinkProps> = ({ path, title, icon }) => {
  return (
    <NavLink to={path} className={s.wrapper}>
      {icon}
      {title}
    </NavLink>
  );
};

export { CustomLink };
