import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Select from './Select';
import Maps from '../utils/maps.json';

interface TabsInterface {
  activeMap: string;
  mapsList: string[];
  setCurrentMap: (arg: string) => void;
}

/**
 * List of saved countries.
 * Used to display countries (maps) added by the user.
 */
const Tabs: React.FC<TabsInterface> = ({ activeMap, mapsList, setCurrentMap }) => {
  const [tabsList, setTabsList] = useState<{ key: string; value: string }[]>([]);
  const [select, setSelect] = useState<boolean>(false);

  // Save a list of tabs based on the user's list.
  useEffect(() => {
    const tabsList: { key: string; value: string }[] = [];

    for (let map of mapsList) {
      const value = Maps.find((region) => region.map === map)?.name;
      if (value) {
        tabsList.push({ key: map, value });
      }
    }

    setTabsList(tabsList);
  }, [mapsList]);

  // For the mobile version, show Select instead of tabs.
  useEffect(() => {
    function resizeAction() {
      setSelect(window.innerWidth < 768);
    }

    resizeAction();
    window.addEventListener('resize', resizeAction);

    return () => {
      window.removeEventListener('resize', resizeAction);
    };
  }, [tabsList]);

  return (
    <div className='tabs'>
      {select && activeMap ? (
        <Select value={activeMap} options={tabsList} onChange={(e) => setCurrentMap(e.target.value)} />
      ) : (
        tabsList.map((item) => (
          <div key={item.key} className={cx('tab', { active: item.key === activeMap })} onClick={() => setCurrentMap(item.key)}>
            {item.value}
          </div>
        ))
      )}
    </div>
  );
};

export default Tabs;
