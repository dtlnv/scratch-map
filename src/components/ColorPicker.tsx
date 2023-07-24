import React from 'react';
import cx from 'classnames';
import { ColorsNumber, Labels } from '../constants';

interface ColorPickerInterface {
  show: boolean;
  selectColor: Function;
}

const ColorPicker: React.FC<ColorPickerInterface> = ({ selectColor, show }) => {
  return (
    <div className={cx('color-picker', { show })}>
      {Array.from({ length: ColorsNumber }).map((_, i) => (
        <div
          key={i}
          title={Labels[`color-${i + 1}`]}
          className={`color-dot color-${i + 1}`}
          onClick={() => selectColor(`color-${i + 1}`)}
        />
      ))}
      <div className='color-dot clear' title='Clear' onClick={() => selectColor(null)}>
        ×
      </div>
    </div>
  );
};

export default ColorPicker;
