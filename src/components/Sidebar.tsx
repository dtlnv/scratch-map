import React, { useState } from 'react';
import ColorsBlock from './ColorsBlock';
import MenuItem from './MenuItem';

interface SidebarInterface {
  clearMapAction: Function;
  selections: { [key: string]: string };
}

const Sidebar: React.FC<SidebarInterface> = ({ clearMapAction, selections }) => {
  return (
    <div className='sidebar'>
      <div className='block'>
        <ColorsBlock selections={selections} />
      </div>
      <div className='block'>
        <MenuItem icon='add'>Add Map</MenuItem>
        <MenuItem icon='clear' onClick={clearMapAction}>
          Clear Map
        </MenuItem>
        <MenuItem icon='remove'>Remove Map</MenuItem>
      </div>
    </div>
  );
};

export default Sidebar;
