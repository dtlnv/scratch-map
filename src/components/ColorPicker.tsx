import React from 'react';
import cx from 'classnames';
import { ColorsNumber, Labels } from '../constants';

interface ColorPickerInterface {
  hoverTitle: string | undefined;
  show: boolean;
  selectColor: Function;
}

const ColorPicker: React.FC<ColorPickerInterface> = ({ hoverTitle, selectColor, show }) => {
  return (
    <div className={cx('color-picker', { show })}>
      {hoverTitle}
      <div className='colors'>
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
    </div>
  );
};

export default ColorPicker;
