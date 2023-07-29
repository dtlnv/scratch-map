import React from 'react';

interface TabsInterface {
  value: string;
  options: { [key: string]: string }[];
  onChange: (arg: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Custom select component. 
 * Used in tabs in the mobile version.
 */
const Select: React.FC<TabsInterface> = ({ value, options, onChange }) => {
  return (
    <label className='custom-select'>
      <select onChange={onChange} value={value}>
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
