import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { BsArrowLeft } from 'react-icons/bs';
import { IOption, IUserData } from '../registration/registrationUserData/models';
import { useProfileUpdate } from '../../hooks/useProfileUpdate';
import {
  initialUserData,
  registrationSelects,
  selectOptions
} from '../registration/registrationUserData/constants';
import { handleValue } from '../../helpers/select';
import { Notification } from '../UI/notification/Notification';
import { NotificationMessage } from '../../models/notifications';
import './EditPersonalData.css';

const EditPersonalData: FC = () => {
  const [userData, setUserData] = useState<IUserData>(initialUserData);
  const { success, setSuccess, updateUserData } = useProfileUpdate();

  const handleChange = (selectedOption: SingleValue<string | IOption>) => {
    const { type, value } = selectedOption as IOption;
    setUserData({ ...userData, [type]: value });
  };

  const handleDataUpdate = async () => {
    await updateUserData(userData).catch();
    setUserData(initialUserData);
  };

  return (
    <div className="wrapper">
      <div className="main">
        <Link className="return" to="/profile">
          <BsArrowLeft className="icon" />
        </Link>
        <div className="title">Edit Personal Data</div>
        {success && <Notification text={NotificationMessage.dataUpdate} handler={setSuccess} />}
        <div className="selects_wrapper">
          {registrationSelects.map((select) => {
            return (
              <div className="select" key={uuidv4()}>
                <div className="select-label">{select[0].toUpperCase() + select.slice(1)}</div>
                <Select
                  classNamePrefix="select"
                  onChange={handleChange}
                  value={handleValue(userData, select, selectOptions[select])}
                  options={selectOptions[select]}
                />
              </div>
            );
          })}
        </div>
        <button type="button" className="update" onClick={handleDataUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export { EditPersonalData };
