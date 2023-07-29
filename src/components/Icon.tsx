import React from 'react';
import cx from 'classnames';

interface IconInterface {
  name: string;
}

/**
 * Simple component for reusable icons.
 */
const Icon: React.FC<IconInterface> = ({ name = '' }) => {
  if (!name) return;

  return <div className={cx('icon', name)} />;
};

export default Icon;
