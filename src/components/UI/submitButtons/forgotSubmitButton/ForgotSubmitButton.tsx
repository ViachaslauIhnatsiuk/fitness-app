import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { IUserProfile } from '../../../registration/registrationUserProfile/models';
import { ForgotSubmitButtonProps } from '../models';
import s from './ForgotSubmitButton.module.css';

const ForgotSubmitButton: FC<ForgotSubmitButtonProps> = ({ path, value, handler }) => {
  const {
    getValues,
    reset,
    formState: { isValid }
  } = useFormContext<IUserProfile>();

  const handleSubmit = async () => {
    await handler(...getValues(['email'])).catch();
    reset();
  };

  return (
    <div className={s.buttons}>
      <Link to={path} className={s.back}>
        Go back
      </Link>
      <input
        className={s.submit}
        style={{
          backgroundColor: !isValid ? '#1f222a' : '#7755ff',
          color: !isValid ? '#7e7f81' : '#ffffff'
        }}
        disabled={!isValid}
        type="submit"
        value={value}
        onClick={handleSubmit}
      />
    </div>
  );
};

export { ForgotSubmitButton };
