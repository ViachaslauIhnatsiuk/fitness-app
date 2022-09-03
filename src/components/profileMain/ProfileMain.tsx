import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineSound, AiFillSound } from 'react-icons/ai';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { useAppSelector } from '../../store/model';
import { selectProfile } from '../../store/selectors';
import { useAuth } from '../../hooks/useAuth';
import { Avatar } from '../UI/avatar/Avatar';
import s from './ProfileMain.module.css';
import { useTheme } from '../../hooks/useTheme';

const ProfileMain: FC = () => {
  const { theme, setTheme } = useTheme();
  const [sound, setSound] = useState<boolean>(false);
  const { currentUser } = useAppSelector(selectProfile);
  const { handleLogout } = useAuth();

  return (
    <div className={s.wrapper}>
      <div className={s.main}>
        <Avatar setImageUrl={() => {}} />
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
            {theme === 'dark' ? (
              <MdOutlineDarkMode className={s.icon} style={{ color: '#fff' }} />
            ) : (
              <MdOutlineLightMode className={s.icon} style={{ color: '#181a20' }} />
            )}
            <span className={s.theme_title}>Theme</span>
            <button
              type="button"
              className={s.theme}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={
                theme === 'dark' ? { backgroundColor: '#7755ff' } : { backgroundColor: '#35383f' }
              }
            >
              <div
                className={s.slider}
                style={theme === 'dark' ? { left: '30px' } : { left: '3px' }}
              />
            </button>
          </div>
          <div className={s.setting}>
            {sound ? (
              <AiOutlineSound className={s.icon} style={{ color: '#181a20' }} />
            ) : (
              <AiFillSound className={s.icon} style={{ color: '#fff' }} />
            )}
            <span className={s.sound_title}>Sound</span>
            <button
              type="button"
              className={s.sound}
              onClick={() => setSound(!sound)}
              style={sound ? { backgroundColor: '#7755ff' } : { backgroundColor: '#35383f' }}
            >
              <div className={s.slider} style={sound ? { left: '30px' } : { left: '3px' }} />
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
    </div>
  );
};

export { ProfileMain };
