import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { passwordRegister } from '../../../constants/formValidation';
import { IUserProfile } from '../../registration/registrationUserProfile/models';
import s from './PasswordInput.module.css';

const PasswordInput: FC = () => {
  const [passwordType, setPasswordType] = useState<string>('password');
  const {
    register,
    formState: { errors }
  } = useFormContext<IUserProfile>();

  return (
    <div className={s.field}>
      <input
        className={s.input}
        placeholder="Password"
        type={passwordType}
        {...register('password', passwordRegister)}
      />
      {passwordType === 'password' ? (
        <AiFillEyeInvisible className={s.icon} onClick={() => setPasswordType('text')} />
      ) : (
        <AiFillEye className={s.icon} onClick={() => setPasswordType('password')} />
      )}
      <p className={s.warning}>{errors.password?.message}</p>
    </div>
  );
};

export { PasswordInput };
