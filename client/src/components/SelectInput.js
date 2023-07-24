import React from 'react';

const SelectInput = (prop) => {
  return (
    <select className='form-select' onChange={prop.onSelect} defaultValue={prop.username}>
      {prop.options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
