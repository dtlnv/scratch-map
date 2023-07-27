import React from 'react';

interface TabsInterface {
  defaultValue: string;
  options: { [key: string]: string }[];
  onChange: (arg: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<TabsInterface> = ({ defaultValue, options, onChange }) => {
  return (
    <label className='custom-select'>
      <select onChange={onChange} defaultValue={defaultValue}>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
