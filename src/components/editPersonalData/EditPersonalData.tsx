import React, { FC, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { IoMdClose } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { IOption, IUserData } from '../registration/registrationUserData/models';
import { useProfileUpdate } from '../../hooks/useProfileUpdate';
import {
  initialUserData,
  registrationSelects,
  selectOptions
} from '../registration/registrationUserData/constants';
import { handleValue } from '../../helpers/select';
import { Button } from '../UI/button/Button';
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
      <Button path="/profile" icon={<IoChevronBackCircleOutline />} />
      <div className="title">Edit Personal Data</div>
      {success && (
        <div className="notification">
          <div className="text">
            Congratulations, your pesonal data has been successfully updated
          </div>
          <IoMdClose className="close" onClick={() => setSuccess(false)} />
        </div>
      )}
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
  );
};

export { EditPersonalData };
