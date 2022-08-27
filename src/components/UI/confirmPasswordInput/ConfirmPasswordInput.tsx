import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { passwordRegister, matchPasswordReport } from '../../../constants/formValidation';
import { IUserProfile } from '../../registration/registrationUserProfile/models';
import s from './ConfirmPasswordInput.module.css';

const ConfirmPasswordInput: FC = () => {
  const [passwordType, setPasswordType] = useState<string>('password');
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
        type={passwordType}
        {...register('confirmPassword', {
          ...passwordRegister,
          validate: (value) => value === watch('password') || matchPasswordReport
        })}
      />
      {passwordType === 'password' ? (
        <AiFillEyeInvisible className={s.icon} onClick={() => setPasswordType('text')} />
      ) : (
        <AiFillEye className={s.icon} onClick={() => setPasswordType('password')} />
      )}
      <p className={s.warning}>{errors.confirmPassword?.message}</p>
    </div>
  );
};

export { ConfirmPasswordInput };
