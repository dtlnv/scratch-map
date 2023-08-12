import React from 'react';
import cx from 'classnames';
import Icon from './Icon';

interface MenuItemInterface {
  icon?: string;
  className?: string;
  children: React.ReactElement | string;
  onClick?: () => void;
}

/**
 * Simple menu item component.
 * Used in sidebar.
 */
const MenuItem: React.FC<MenuItemInterface> = ({ icon = '', className, children, ...rest }) => {
  return (
    <div className={cx('menu-item', className)} {...rest}>
      {icon && <Icon name={icon} />}
      {children}
    </div>
  );
};

export default MenuItem;
