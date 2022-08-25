import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { passwordRegister, matchPasswordReport } from '../../../constants/formValidation';
import { IUserProfile } from '../../registration/registrationUserProfile/models';
import s from './ConfirmPasswordInput.module.css';

const ConfirmPasswordInput: FC = () => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<IUserProfile>();

  return (
    <div className={s.field}>
      <input
        className={s.input}
        placeholder="Confirm Password"
        type="password"
        {...register('confirmPassword', {
          ...passwordRegister,
          validate: (value) => value === watch('password') || matchPasswordReport
        })}
      />
      <p className={s.warning}>{errors.confirmPassword?.message}</p>
    </div>
  );
};

export { ConfirmPasswordInput };
