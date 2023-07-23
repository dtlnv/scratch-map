import React, { useState } from 'react';
import cx from 'classnames';

interface ColorPickerInterface {
  show: boolean;
}

const ColorPicker: React.FC<ColorPickerInterface> = ({ show }) => {
  return (
    <div className={cx('color-picker', { show })}>
      <div className='color color-1' />
      <div className='color color-2' />
      <div className='color color-3' />
      <div className='color color-4' />
      <div className='color color-5' />
      <div className='color clear'>×</div>
    </div>
  );
};

export default ColorPicker;
