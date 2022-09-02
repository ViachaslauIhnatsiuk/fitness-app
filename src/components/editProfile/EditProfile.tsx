import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { BsArrowLeft } from 'react-icons/bs';
import { useProfileUpdate } from '../../hooks/useProfileUpdate';
import { NameInput } from '../UI/nameInput/NameInput';
import { PasswordInput } from '../UI/passwordInput/PasswordInput';
import { UpdateProfileSubmitButton } from '../UI/submitButtons/updateProfileSubmitButton/UpdateProfileSubmitButton';
import { IUserProfile } from '../registration/registrationUserProfile/models';
import { Notification } from '../UI/notification/Notification';
import { NotificationMessage } from '../../models/notifications';
import s from './EditProfile.module.css';

const EditProfile: FC = () => {
  const { success, setSuccess, updateUserProfile } = useProfileUpdate();
  const methods = useForm<IUserProfile>({ mode: 'onBlur' });
  const { handleSubmit, reset } = methods;

  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <Link className={s.return} to="/profile">
          <BsArrowLeft className={s.icon} />
        </Link>
        <div className={s.title}>Edit Profile</div>
        {success && <Notification text={NotificationMessage.profileUpdate} handler={setSuccess} />}
        <FormProvider {...methods}>
          <form className={s.form} onSubmit={handleSubmit(() => reset())}>
            <NameInput />
            <PasswordInput />
            <UpdateProfileSubmitButton path="" value="Update" handler={updateUserProfile} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export { EditProfile };
