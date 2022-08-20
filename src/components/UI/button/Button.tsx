import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Button.module.css';
import { ButtonProps } from './models';

const Button: FC<ButtonProps> = ({
  path,
  icon,
  iconPosition = 'left',
  text,
  onClick,
  isStyled,
  customStyles
}) => {
  const navigate = useNavigate();
  const buttonStyles = customStyles || s.button;

  const redirectHandler = () => {
    if (path) navigate(path);
  };

  return (
    <button
      className={isStyled ? buttonStyles : s.button_redirect}
      type="button"
      onClick={onClick || redirectHandler}
      role="link"
      tabIndex={0}
      onKeyPress={onClick || redirectHandler}
    >
      {iconPosition === 'left' && icon} {text}
      {iconPosition === 'right' && icon}
    </button>
  );
};

export { Button };
