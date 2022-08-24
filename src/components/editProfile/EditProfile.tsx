import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { IUserProfile } from '../registration/registrationUserProfile/models';
import { nameRegister, emailRegister, passwordRegister } from '../../constants/formValidation';
import { Button } from '../UI/button/Button';
import { useProfileUpdate } from '../../hooks/useProfileUpdate';
import s from './EditProfile.module.css';

const EditProfile: FC = () => {
  const { updateUserProfile } = useProfileUpdate();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid }
  } = useForm<IUserProfile>({ mode: 'onBlur' });

  return (
    <div className={s.wrapper}>
      <Button path="/profile" icon={<IoChevronBackCircleOutline />} />
      <div className={s.title}>Edit Profile</div>
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
        <input
          className={s.button}
          style={{ backgroundColor: !isValid ? '#35383f' : '#7755ff' }}
          disabled={!isValid}
          type="submit"
          value="Update"
          onClick={() => updateUserProfile(...getValues(['name', 'email', 'password']))}
        />
      </form>
    </div>
  );
};

export { EditProfile };
