import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { ColorsNumber, Labels } from '../constants';

interface ColorsBlockInterface {
  selections: { [key: string]: string } | null;
}

const ColorsBlock: React.FC<ColorsBlockInterface> = ({ selections }) => {
  const [counters, setCounters] = useState<{ [key: string]: number }>();

  useEffect(() => {
    const values: { [key: string]: number } = {};

    for (let i = 1; i <= ColorsNumber; i++) {
      values[`color-${i}`] = 0;
    }

    for (let region in selections) {
      const color: string = selections[region];
      values[color] = values[color] + 1;
    }
    setCounters(values);
  }, [selections]);

  return (
    <div className='colors-block'>
      {Object.keys(Labels).map((color) => (
        <div className='color-block' key={color}>
          <div className={cx('color-dot', color)} />
          {Labels[color]} ({counters?.[color]})
        </div>
      ))}
    </div>
  );
};

export default ColorsBlock;
