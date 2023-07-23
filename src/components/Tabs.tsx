import React, { useEffect, useState } from 'react';
import cx from 'classnames';

const tabsListDefault = [
  {
    map: 'world',
    name: 'World',
  },
  {
    map: 'ukraine',
    name: 'Ukraine',
  },
  {
    map: 'europe',
    name: 'Europe',
  },
  {
    map: 'poland',
    name: 'Poland',
  },
  {
    map: 'canada',
    name: 'Canada',
  },
  {
    map: 'usa',
    name: 'USA',
  },
];

interface TabsInterface {
  activeMap: string;
  setCurrentMap: (arg: string) => void;
}

const Tabs: React.FC<TabsInterface> = ({ activeMap, setCurrentMap }) => {
  const [tabsList, setTabsList] = useState<{ name: string; map: string }[]>([]);
  useEffect(() => {
    setTabsList(tabsListDefault);
  }, []);

  return (
    <div className='tabs'>
      {tabsList.map((item) => (
        <div key={item.map} className={cx('tab', { active: item.map === activeMap })} onClick={() => setCurrentMap(item.map)}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
