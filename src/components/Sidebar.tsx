import React, { useState } from 'react';
import ColorsBlock from './ColorsBlock';
import MenuItem from './MenuItem';

interface SidebarInterface {
  clearMapAction: Function;
  selections: { [key: string]: string | null } | null;
}

const Sidebar: React.FC<SidebarInterface> = ({ clearMapAction, selections }) => {
  return (
    <div className='sidebar'>
      <div className='block'>
        <MenuItem icon='add'>Add Map</MenuItem>
        <MenuItem icon='remove' onClick={clearMapAction}>
          Clear Map
        </MenuItem>
        <MenuItem icon='remove'>Remove Map</MenuItem>
      </div>
      <div className='block'>
        <ColorsBlock selections={selections} />
      </div>
    </div>
  );
};

export default Sidebar;
