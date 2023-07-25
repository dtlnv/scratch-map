import React from 'react';
import Icon from './Icon';
import cx from 'classnames';

interface MenuItemInterface {
  icon?: string;
  className?: string;
  children: any;
  onClick?: Function;
}

const MenuItem: React.FC<MenuItemInterface> = ({ icon = '', className, children, onClick }) => {
  return (
    <div className={cx('menu-item', className)} onClick={() => onClick?.()}>
      <Icon name={icon} />
      {children}
    </div>
  );
};

export default MenuItem;
