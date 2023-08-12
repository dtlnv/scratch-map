import React from 'react';
import { ColorsNumber, Labels } from '../utils/constants';

interface ColorPickerInterface {
  label?: string;
  selectColor: (color: string | null) => void;
  close: () => void;
}

/**
 * Choose a color for active regions.
 */
const ColorPicker: React.FC<ColorPickerInterface> = ({ label, selectColor, close }) => {
  return (
    <div className='color-picker'>
      <div className='colors'>
        {Array.from({ length: ColorsNumber }).map((_, i) => (
          <div
            key={i}
            title={Labels[`color-${i + 1}`]}
            className={`color-dot color-${i + 1}`}
            onClick={() => selectColor(`color-${i + 1}`)}
          />
        ))}
        <div className='color-dot clear' title='Clear' onClick={() => selectColor(null)} />
        <div className='color-dot close' title='Close' onClick={() => close()}>
          ×
        </div>
      </div>
      {label}
    </div>
  );
};

export default ColorPicker;
