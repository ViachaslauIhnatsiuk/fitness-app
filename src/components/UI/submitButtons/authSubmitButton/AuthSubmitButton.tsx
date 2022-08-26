import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { IUserProfile } from '../../../registration/registrationUserProfile/models';
import { AuthSubmitButtonProps } from '../models';
import s from './AuthSubmitButton.module.css';

const AuthSubmitButton: FC<AuthSubmitButtonProps> = ({ path, value, handler }) => {
  const {
    getValues,
    reset,
    formState: { isValid }
  } = useFormContext<IUserProfile>();

  const handleSubmit = async () => {
    await handler(...getValues(['email', 'password'])).catch();
    reset();
  };

  return (
    <Link to={path} className={s.link}>
      <input
        className={s.button}
        style={{ backgroundColor: !isValid ? '#6b5bab' : '#7755ff' }}
        disabled={!isValid}
        type="submit"
        value={value}
        onClick={handleSubmit}
      />
    </Link>
  );
};

export { AuthSubmitButton };
