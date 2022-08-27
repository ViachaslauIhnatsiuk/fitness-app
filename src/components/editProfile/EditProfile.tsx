import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { useProfileUpdate } from '../../hooks/useProfileUpdate';
import { NameInput } from '../UI/nameInput/NameInput';
import { PasswordInput } from '../UI/passwordInput/PasswordInput';
import { UpdateProfileSubmitButton } from '../UI/submitButtons/updateProfileSubmitButton/UpdateProfileSubmitButton';
import { IUserProfile } from '../registration/registrationUserProfile/models';
import { Button } from '../UI/button/Button';
import s from './EditProfile.module.css';

const EditProfile: FC = () => {
  const { success, setSuccess, updateUserProfile } = useProfileUpdate();
  const methods = useForm<IUserProfile>({ mode: 'onBlur' });
  const { handleSubmit, reset } = methods;

  return (
    <div className={s.wrapper}>
      <Button path="/profile" icon={<IoChevronBackCircleOutline />} />
      <div className={s.title}>Edit Profile</div>
      {success && (
        <div className={s.notification}>
          <div className={s.text}>
            Congratulations, your profile data has been successfully updated
          </div>
          <IoMdClose className={s.close} onClick={() => setSuccess(false)} />
        </div>
      )}
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit(() => reset())}>
          <NameInput />
          <PasswordInput />
          <UpdateProfileSubmitButton path="" value="Update" handler={updateUserProfile} />
        </form>
      </FormProvider>
    </div>
  );
};

export { EditProfile };
