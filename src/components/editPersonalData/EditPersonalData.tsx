import React, { FC, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { IOption, IUserData } from '../registration/registrationUserData/models';
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

  const handleChange = (selectedOption: SingleValue<string | IOption>) => {
    const { type, value } = selectedOption as IOption;
    setUserData({ ...userData, [type]: value });
  };

  return (
    <div className="wrapper">
      <Button path="/profile" icon={<IoChevronBackCircleOutline />} />
      <div className="title">Edit Personal Data</div>
      <div className="selects">
        {registrationSelects.map((select) => {
          return (
            <div className="select" key={Math.random()}>
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
      <button type="button" className="update">
        Update
      </button>
    </div>
  );
};

export { EditPersonalData };
