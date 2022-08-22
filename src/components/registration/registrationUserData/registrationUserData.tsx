import React, { FC, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { IUserData, IOption } from './models';
import { selectOptions, initialUserData, registrationSelects } from './constants';
import { handleValue } from '../../../helpers/select';
import './registrationUserData.css';

const registrationUserData: FC = () => {
  const [userData, setUserData] = useState<IUserData>(initialUserData);

  const handleChange = (selectedOption: SingleValue<string | IOption>) => {
    const { type, value } = selectedOption as IOption;
    setUserData({ ...userData, [type]: value });
  };

  return (
    <div className="wrapper">
      <div className="title">Tell Us About Yourself</div>
      <div className="subtitle">
        To give you a better experience and results we need to know your:
      </div>
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
      <div className="buttons">
        <div className="back">Back</div>
        <div className="continue">Continue</div>
      </div>
    </div>
  );
};

export { registrationUserData };
