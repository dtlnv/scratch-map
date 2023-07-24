import React, { useState } from 'react';
import cx from 'classnames';

interface ColorPickerInterface {
  show: boolean;
  selectColor: Function;
}

const colorsNumber: number = 5;

const ColorPicker: React.FC<ColorPickerInterface> = ({ selectColor, show }) => {
  return (
    <div className={cx('color-picker', { show })}>
      {Array.from({ length: colorsNumber }).map((_, i) => (
        <div key={i} className={`color color-${i + 1}`} onClick={() => selectColor(`color-${i + 1}`)} />
      ))}
      <div className='color clear' onClick={() => selectColor(null)}>
        ×
      </div>
    </div>
  );
};

export default ColorPicker;
