import React, { useEffect, useState } from 'react';
import './Tabs.scss';
import cx from 'classnames';

const tabsListDefault = [
  {
    map: 'world',
    name: 'World',
  },
  {
    map: 'urkaine',
    name: 'Urkaine',
  },
  {
    map: 'europe',
    name: 'Europe',
  },
];

interface TabsInterface {
  activeMap: string;
}

const Tabs: React.FC<TabsInterface> = ({ activeMap }) => {
  const [tabsList, setTabsList] = useState<{ name: string; map: string }[]>([]);
  useEffect(() => {
    setTabsList(tabsListDefault);
  }, []);

  return (
    <div className='tabs'>
      {tabsList.map((item) => (
        <div key={item.map} className={cx('tab', { active: item.map === activeMap })}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
