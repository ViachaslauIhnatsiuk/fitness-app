import React, { ChangeEvent, FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdModeEditOutline } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import { useReg } from '../../../hooks/useReg';
import { IUserProfile } from './models';
import { RememberMe } from '../../UI/rememberMe/RememberMe';
import { SocialAuthRowButtons } from '../../authentication/socialAuthRowButtons/SocialAuthRowButtons';
import { Separator } from '../../UI/separator/Separator';
import { AccountExistance } from '../../UI/accountExistance/AccountExistance';
import { SignLinkTitle, SignLink } from '../../../models/CrossSignLinks';
import { NameInput } from '../../UI/nameInput/NameInput';
import { EmailInput } from '../../UI/emailInput/EmailInput';
import { PasswordInput } from '../../UI/passwordInput/PasswordInput';
import { ConfirmPasswordInput } from '../../UI/confirmPasswordInput/ConfirmPasswordInput';
import { RegSubmitButton } from '../../UI/submitButtons/regSubmitButton/RegSubmitButton';
import { storage, ref, getDownloadURL, uploadBytes } from '../../../firebase/firebase';
import avatar from '../../../assets/avatar.svg';
import s from './RegistrationUserProfile.module.css';

const RegistrationUserProfile: FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const { registrationError, handleRegistration } = useReg();
  const methods = useForm<IUserProfile>({ mode: 'onBlur' });
  const { handleSubmit, reset } = methods;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    if (file) setImage(file);
  };

  const handleImageSubmit = async () => {
    const imageRef = ref(storage, `avatars/${image?.name as string}`);
    setImage(null);
    await uploadBytes(imageRef, image as File);
    const url = await getDownloadURL(imageRef);
    setImageUrl(url);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Fill Your Profile</div>
      <div className={s.avatar}>
        <div className={s.image_wrapper}>
          <img className={s.image} src={imageUrl || avatar} alt="avatar" />
        </div>
        {image ? (
          <AiOutlineCheck className={s.check} onClick={handleImageSubmit} />
        ) : (
          <label htmlFor="edit" className={s.edit_label}>
            <MdModeEditOutline className={s.edit_icon} />
            <input
              id="edit"
              type="file"
              className={s.edit}
              onChange={(e) => handleImageChange(e)}
            />
          </label>
        )}
      </div>
      {registrationError && <div className={s.error}>This email address is already in use</div>}
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit(() => reset())}>
          <NameInput />
          <EmailInput />
          <PasswordInput />
          <ConfirmPasswordInput />
          <RememberMe />
          <RegSubmitButton
            avatar={imageUrl}
            path=""
            value="Continue"
            handler={handleRegistration}
          />
        </form>
      </FormProvider>
      <Separator text="or continue with" />
      <SocialAuthRowButtons />
      <AccountExistance title={SignLinkTitle.haveAccount} path="sign-in" link={SignLink.signIn} />
    </div>
  );
};

export { RegistrationUserProfile };
