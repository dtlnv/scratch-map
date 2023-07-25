import React from 'react';
import ColorsBlock from './ColorsBlock';
import MenuItem from './MenuItem';
import Maps from '../maps.json';

interface SidebarInterface {
  addMapAction: Function;
  clearMapAction: Function;
  removeMapAction: Function;
  selections: { [key: string]: string };
}

const Sidebar: React.FC<SidebarInterface> = ({ addMapAction, clearMapAction, removeMapAction, selections }) => {
  return (
    <div className='sidebar'>
      <div className='block'>
        <ColorsBlock selections={selections} />
      </div>
      <div className='block'>
        <MenuItem icon='add' className='select'>
          <select onChange={(e) => addMapAction(e.target.value)} value={''}>
            <option>Add map</option>
            {Maps.map((option) => (
              <option key={option.map} value={option.map}>
                {option.name}
              </option>
            ))}
          </select>
        </MenuItem>
        <MenuItem icon='clear' onClick={clearMapAction}>
          Clear map
        </MenuItem>
        <MenuItem icon='remove' onClick={removeMapAction}>
          Remove map
        </MenuItem>
      </div>
    </div>
  );
};

export default Sidebar;
