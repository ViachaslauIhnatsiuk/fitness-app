import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useReg } from '../../../hooks/useReg';
import { IUserProfile } from './models';
import { nameRegister, emailRegister, passwordRegister, matchPasswordReport } from './constants';
import s from './registrationUserProfile.module.css';

const registrationUserProfile: FC = () => {
  const { registrationError, handleRegistration } = useReg();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors, isValid }
  } = useForm<IUserProfile>({ mode: 'onBlur' });

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Fill Your Profile</div>
      <div className={s.avatar} />
      {registrationError && <div className={s.error}>This email address is already in use</div>}
      <form className={s.form} onSubmit={handleSubmit(() => reset())}>
        <div className={s.field}>
          <input
            autoComplete="off"
            className={s.input}
            placeholder="Name"
            {...register('name', nameRegister)}
          />
          <p className={s.warning}>{errors.name?.message}</p>
        </div>
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
        <div className={s.field}>
          <input
            className={s.input}
            placeholder="Password"
            type="password"
            {...register('password', passwordRegister)}
          />
          <p className={s.warning}>{errors.password?.message}</p>
        </div>
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
        <input
          className={s.button}
          disabled={!isValid}
          type="submit"
          value="Start"
          onClick={() => handleRegistration(...getValues(['name', 'email', 'password']))}
        />
      </form>
    </div>
  );
};

export { registrationUserProfile };
