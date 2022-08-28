import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { IUserProfile } from '../../../registration/registrationUserProfile/models';
import { UpdateProfileSubmitButtonProps } from '../models';
import s from './UpdateProfileSubmitButton.module.css';

const UpdateProfileSubmitButton: FC<UpdateProfileSubmitButtonProps> = ({
  path,
  value,
  handler
}) => {
  const {
    getValues,
    reset,
    formState: { isValid }
  } = useFormContext<IUserProfile>();

  const handleSubmit = async () => {
    await handler(...getValues(['name', 'password'])).catch();
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

export { UpdateProfileSubmitButton };
