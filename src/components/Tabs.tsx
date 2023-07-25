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
    name: 'Countries of the Europe',
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
  const [select, setSelect] = useState<boolean>(false);

  useEffect(() => {
    setTabsList(tabsListDefault);
  }, []);

  useEffect(() => {
    function resizeAction() {
      console.log('window.innerWidth', window.innerWidth);

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
        <label className='custom-select'>
          <select onChange={(e) => setCurrentMap(e.target.value)} defaultValue={activeMap}>
            {tabsList.map((item) => (
              <option key={item.map} value={item.map}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      ) : (
        tabsList.map((item) => (
          <div key={item.map} className={cx('tab', { active: item.map === activeMap })} onClick={() => setCurrentMap(item.map)}>
            {item.name}
          </div>
        ))
      )}
    </div>
  );
};

export default Tabs;
