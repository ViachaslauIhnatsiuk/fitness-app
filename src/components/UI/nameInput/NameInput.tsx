import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { nameRegister } from '../../../constants/formValidation';
import { IUserProfile } from '../../registration/registrationUserProfile/models';
import s from './NameInput.module.css';

const NameInput: FC = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<IUserProfile>();

  return (
    <div className={s.field}>
      <input
        autoComplete="off"
        className={s.input}
        placeholder="Name"
        {...register('name', nameRegister)}
      />
      <p className={s.warning}>{errors.name?.message}</p>
    </div>
  );
};

export { NameInput };
