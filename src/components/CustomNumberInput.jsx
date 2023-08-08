import React, { useState } from 'react';
const CustomNumberInput = (props) => {
  const [value, setValue] = useState(props.value || '');

  const handleChange = (e) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleIncrement = () => {
    const newValue = Number(value) + 1;
    setValue(newValue.toString());
    if (props.onChange) {
      const event = {
        target: {
          name: props.name,
          value: newValue.toString(),
        },
      };
      props.onChange(event);
    }
  };

  const handleDecrement = () => {
    const newValue = Number(value) - 1;
    setValue(newValue.toString());
    if (props.onChange) {
      const event = {
        target: {
          name: props.name,
          value: newValue.toString(),
        },
      };
      props.onChange(event);
    }
  };

  return (
    <div className="custom-number-input">
      <input className='input_field'
        {...props}
        type="number"
        value={value}
        onChange={handleChange}
        placeholder='1'
      />
      <div className="custom-number-input-arrows">
        <div className="arrow up" onClick={handleIncrement}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7.41422 4.25239C7.30493 4.14375 7.15708 4.08276 7.00297 4.08276C6.84886 4.08276 6.70102 4.14375 6.59172 4.25239L1.92505 8.91906C1.82949 9.03065 1.77955 9.1742 1.78522 9.32101C1.79089 9.46782 1.85175 9.60708 1.95564 9.71097C2.05953 9.81486 2.1988 9.87572 2.34561 9.88139C2.49242 9.88706 2.63596 9.83712 2.74755 9.74156L7.00005 5.48906L11.2526 9.74739C11.3624 9.85724 11.5114 9.91895 11.6667 9.91895C11.8221 9.91895 11.971 9.85724 12.0809 9.74739C12.1907 9.63755 12.2524 9.48857 12.2524 9.33323C12.2524 9.17788 12.1907 9.0289 12.0809 8.91906L7.41422 4.25239Z" fill="#5065A8" />
          </svg>
        </div>
        <div className="arrow down" onClick={handleDecrement}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7.41422 9.74761C7.30493 9.85625 7.15708 9.91724 7.00297 9.91724C6.84886 9.91724 6.70102 9.85625 6.59172 9.74761L1.92505 5.08094C1.82949 4.96935 1.77955 4.8258 1.78522 4.67899C1.79089 4.53218 1.85175 4.39292 1.95564 4.28903C2.05953 4.18514 2.1988 4.12428 2.34561 4.11861C2.49242 4.11294 2.63596 4.16288 2.74755 4.25844L7.00005 8.51094L11.2526 4.25261C11.3624 4.14276 11.5114 4.08105 11.6667 4.08105C11.8221 4.08105 11.971 4.14276 12.0809 4.25261C12.1907 4.36245 12.2524 4.51143 12.2524 4.66677C12.2524 4.82212 12.1907 4.9711 12.0809 5.08094L7.41422 9.74761Z" fill="#5065A8" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CustomNumberInput;
