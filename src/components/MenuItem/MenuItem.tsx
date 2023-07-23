import React, { useEffect, useState } from 'react';
import './MenuItem.scss';

interface MenuItemInterface {
  icon?: string;
  children: string;
}

const MenuItem: React.FC<MenuItemInterface> = ({ icon, children }) => {
  const [Icon, setIcon] = useState<React.FunctionComponent<React.SVGAttributes<SVGElement>> | null>(null);

  useEffect(() => {
    import(`./icons/${icon}.svg`).then((module) => {
      setIcon(() => module.default);
    });
  }, []);
  
  return (
    <div className='menu-item'>
      {Icon && <Icon />}
      {children}
    </div>
  );
};

export default MenuItem;
