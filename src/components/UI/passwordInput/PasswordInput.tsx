import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { passwordRegister } from '../../../constants/formValidation';
import { IUserProfile } from '../../registration/registrationUserProfile/models';
import s from './PasswordInput.module.css';

const PasswordInput: FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<IUserProfile>();

  return (
    <div className={s.field}>
      <input
        className={s.input}
        placeholder="Password"
        type="password"
        {...register('password', passwordRegister)}
      />
      <p className={s.warning}>{errors.password?.message}</p>
    </div>
  );
};

export { PasswordInput };
