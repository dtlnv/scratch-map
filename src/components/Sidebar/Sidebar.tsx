import React, { useState } from 'react';
import './Sidebar.scss';
import ColorsBlock from '../ColorsBlock/ColorsBlock';
import MenuItem from '../MenuItem/MenuItem';

const Sidebar: React.FC = () => {
  return (
    <div className='sidebar'>
      <div className='block'>
        <MenuItem icon="add">Add Map</MenuItem>
        <MenuItem icon="remove">Remove Map</MenuItem>
      </div>
      <div className='block'>
        <ColorsBlock />
      </div>
    </div>
  );
};

export default Sidebar;
