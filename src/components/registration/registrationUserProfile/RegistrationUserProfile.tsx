import React, { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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
import { Avatar } from '../../UI/avatar/Avatar';
import s from './RegistrationUserProfile.module.css';

const RegistrationUserProfile: FC = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const { registrationError, handleRegistration } = useReg();
  const methods = useForm<IUserProfile>({ mode: 'onBlur' });
  const { handleSubmit, reset } = methods;

  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <div className={s.title}>Fill Your Profile</div>
        <Avatar setImageUrl={setImageUrl} />
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
              value="Complete registration"
              handler={handleRegistration}
            />
          </form>
        </FormProvider>
        <Separator text="or continue with" />
        <SocialAuthRowButtons />
        <AccountExistance title={SignLinkTitle.haveAccount} path="sign-in" link={SignLink.signIn} />
      </div>
    </div>
  );
};

export { RegistrationUserProfile };
