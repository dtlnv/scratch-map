import React from 'react';
import cx from 'classnames';

interface MenuItemInterface {
  icon?: string;
  children: string;
}

const MenuItem: React.FC<MenuItemInterface> = ({ icon, children }) => {
  return (
    <div className='menu-item'>
      <div className={cx('icon', icon)} />
      {children}
    </div>
  );
};

export default MenuItem;
