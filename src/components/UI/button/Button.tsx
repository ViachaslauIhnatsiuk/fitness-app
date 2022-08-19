import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './RedirectButton.module.css';
import { ButtonProps } from './models';

const Button: FC<ButtonProps> = ({ path, icon, text, onClick, isStyled }) => {
  const navigate = useNavigate();

  const redirectHandler = () => {
    if (path) navigate(path);
  };

  return (
    <button
      className={isStyled ? s.button : s.button_redirect}
      type="button"
      onClick={onClick || redirectHandler}
      role="link"
      tabIndex={0}
      onKeyPress={onClick || redirectHandler}
    >
      {icon} {text}
    </button>
  );
};

export { Button };
