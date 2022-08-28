import React, { FC, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { setNewUser } from '../../../store/slices/profileSlice';
import { IOption, IUserData } from './models';
import { selectOptions, registrationSelects, initialUserData } from './constants';
import { handleValue } from '../../../helpers/select';
import './RegistrationUserData.css';

const RegistrationUserData: FC = () => {
  const [newUserData, setNewUserData] = useState<IUserData>(initialUserData);
  const dispatch = useAppDispatch();

  const handleChange = (selectedOption: SingleValue<string | IOption>) => {
    const { type, value } = selectedOption as IOption;
    setNewUserData({ ...newUserData, [type]: value });
  };

  const saveNewUserData = () => {
    dispatch(setNewUser(newUserData));
  };

  return (
    <div className="registration-wrapper">
      <div className="title">Tell Us About Yourself</div>
      <div className="subtitle">
        To give you a better experience and results we need to know your:
      </div>
      <div className="selects">
        {registrationSelects.map((select) => {
          return (
            <div className="select" key={uuidv4()}>
              <div className="select-label">{select[0].toUpperCase() + select.slice(1)}</div>
              <Select
                classNamePrefix="select"
                onChange={handleChange}
                value={handleValue(newUserData, select, selectOptions[select])}
                options={selectOptions[select]}
              />
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <Link to="/" className="back">
          Back
        </Link>
        <Link to="user-profile" className="continue" onClick={saveNewUserData}>
          Continue
        </Link>
      </div>
    </div>
  );
};

export { RegistrationUserData };
