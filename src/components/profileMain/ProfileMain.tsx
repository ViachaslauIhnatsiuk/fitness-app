import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import s from './ProfileMain.module.css';
import { useAppSelector } from '../../store/model';
import { selectProfile } from '../../store/selectors';

const ProfileMain: FC = () => {
  const [theme, setTheme] = useState<boolean>(false);
  const { currentUser } = useAppSelector(selectProfile);
  const { handleLogout } = useAuth();

  return (
    <div className={s.wrapper}>
      <div className={s.page}>Profile</div>
      <div className={s.avatar}></div>
      <div className={s.name}>{currentUser.name}</div>
      <div className={s.email}>{currentUser.email}</div>
      <div className={s.settings}>
        <div className={s.setting}>
          <BsFillPersonFill className={s.icon} />
          <Link to="edit-profile" className={s.title}>
            Edit Profile
          </Link>
        </div>
        <div className={s.setting}>
          <IoMdInformationCircleOutline className={s.icon} />
          <Link to="edit-personal-data" className={s.title}>
            Edit Personal Data
          </Link>
        </div>
        <div className={s.setting}>
          {theme ? (
            <MdOutlineLightMode className={s.icon} style={{ color: '#181a20' }} />
          ) : (
            <MdOutlineDarkMode className={s.icon} style={{ color: '#fff' }} />
          )}
          <span className={s.theme_title}>Theme</span>
          <button type="button" className={s.theme} onClick={() => setTheme(!theme)}>
            <div className={s.slider} style={theme ? { left: '30px' } : { left: '3px' }} />
          </button>
        </div>
        <div className={s.setting}>
          <FiLogOut className={s.logout_icon} />
          <Link to="/" role="presentation" className={s.logout_title} onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export { ProfileMain };
