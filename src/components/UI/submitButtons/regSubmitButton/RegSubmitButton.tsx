import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { IUserProfile } from '../../../registration/registrationUserProfile/models';
import { RegSubmitButtonProps } from '../models';
import s from './RegSubmitButton.module.css';

const RegSubmitButton: FC<RegSubmitButtonProps> = ({ avatar, path, value, handler }) => {
  const {
    getValues,
    reset,
    formState: { isValid }
  } = useFormContext<IUserProfile>();

  const handleSubmit = async () => {
    await handler(avatar, ...getValues(['name', 'email', 'password'])).catch();
    reset();
  };

  return (
    <Link to={path} className={s.link}>
      <input
        className={s.button}
        style={{
          backgroundColor: !isValid ? '#1f222a' : '#7755ff',
          color: !isValid ? '#7e7f81' : '#ffffff'
        }}
        disabled={!isValid}
        type="submit"
        value={value}
        onClick={handleSubmit}
      />
    </Link>
  );
};

export { RegSubmitButton };
