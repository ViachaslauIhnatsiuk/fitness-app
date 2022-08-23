import React, { FC } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { AiOutlineEye } from 'react-icons/ai';
import s from './Profile.module.css';

const Profile: FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>Profile</div>
      <div className={s.avatar} />
      <div className={s.name}>rssfinaltask</div>
      <div className={s.email}>rssfinaltask@gmail.com</div>
      <div className={s.settings}>
        <div className={s.setting}>
          <CgProfile className={s.icon} />
          <span className={s.setting_title}>Edit Profile</span>
        </div>
        <div className={s.setting}>
          <IoMdInformationCircleOutline className={s.icon} />
          <span className={s.setting_title}>Edit Personal Data</span>
        </div>
        <div className={s.setting}>
          <AiOutlineEye className={s.icon} />
          <span className={s.setting_title}>Theme</span>
          <div className={s.theme}>
            <div className={s.toggler} />
            <div className={s.off}></div>
            <div className={s.on}></div>
          </div>
        </div>
        <div className={s.setting}>
          <FiLogOut className={s.logout_icon} />
          <span className={s.logout_title}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export { Profile };
