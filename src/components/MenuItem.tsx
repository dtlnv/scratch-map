import React from 'react';
import Icon from './Icon';

interface MenuItemInterface {
  icon?: string;
  children: string;
  onClick?: Function;
}

const MenuItem: React.FC<MenuItemInterface> = ({ icon = '', children, onClick }) => {
  return (
    <div className='menu-item' onClick={() => onClick?.()}>
      <Icon name={icon} />
      {children}
    </div>
  );
};

export default MenuItem;
