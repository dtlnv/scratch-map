import React, { useState } from 'react';
import './ColorPicker.scss';

interface ColorPickerInterface {
  name: string;
}

const ColorPicker: React.FC = () => {
  return (
    <div className='color-picker'>
      <div className='color color-1' />
      <div className='color color-2' />
      <div className='color color-3' />
      <div className='color color-4' />
      <div className='color color-5' />
      <div className='color color-6' />
    </div>
  );
};

export default ColorPicker;
