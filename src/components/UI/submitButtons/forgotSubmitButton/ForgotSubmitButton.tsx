import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { IUserProfile } from '../../../registration/registrationUserProfile/models';
// import { ForgotSubmitButtonProps } from '../models';
import s from './ForgotSubmitButton.module.css';

interface ForgotSubmitButtonProps {
  path: string;
  value: string;
  handler(email: string): Promise<void>;
}

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
      <Link to={path} className={s.button}>
        Go back
      </Link>
      <input
        className={s.button}
        style={{ backgroundColor: !isValid ? '#6b5bab' : '#7755ff' }}
        disabled={!isValid}
        type="submit"
        value={value}
        onClick={handleSubmit}
      />
    </div>
  );
};

export { ForgotSubmitButton };
