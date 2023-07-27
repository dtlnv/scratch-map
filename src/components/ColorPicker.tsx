import React from 'react';
import { ColorsNumber, Labels } from '../constants';

interface ColorPickerInterface {
  hoverTitle: string | undefined;
  selectColor: Function;
}

const ColorPicker: React.FC<ColorPickerInterface> = ({ hoverTitle, selectColor }) => {
  return (
    <div className='color-picker'>
      {hoverTitle}
      <div className='colors'>
        {Array.from({ length: ColorsNumber }).map((_, i) => (
          <button
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
    </div>
  );
};

export default ColorPicker;
