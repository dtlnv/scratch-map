import React from 'react';
import cx from 'classnames';
import Icon from './Icon';

interface MenuItemInterface {
  icon?: string;
  className?: string;
  children: any;
  onClick?: Function;
}

/**
 * Simple menu item component. 
 * Used in sidebar.
 */
const MenuItem: React.FC<MenuItemInterface> = ({ icon = '', className, children, onClick }) => {
  return (
    <div className={cx('menu-item', className)} onClick={() => onClick?.()}>
      {icon && <Icon name={icon} />}
      {children}
    </div>
  );
};

export default MenuItem;
