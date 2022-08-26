import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { emailRegister } from '../../../constants/formValidation';
import { IUserProfile } from '../../registration/registrationUserProfile/models';
import s from './EmailInput.module.css';

const EmailInput: FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<IUserProfile>();

  return (
    <div className={s.field}>
      <input
        autoComplete="off"
        className={s.input}
        placeholder="E-mail"
        type="email"
        {...register('email', emailRegister)}
      />
      <p className={s.warning}>{errors.email?.message}</p>
    </div>
  );
};

export { EmailInput };
