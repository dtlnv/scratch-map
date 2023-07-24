import React from 'react';
import Icon from './Icon';

interface MenuItemInterface {
  icon?: string;
  children: string;
}

const MenuItem: React.FC<MenuItemInterface> = ({ icon = '', children }) => {
  return (
    <div className='menu-item'>
      <Icon name={icon} />
      {children}
    </div>
  );
};

export default MenuItem;
