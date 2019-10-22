import React from 'react';
import Randomizer from './Randomizer.js';
import Search from './Search.js';
import '../styles/MapOverlay.scss';

const MapOverlay = () => {
  return (
    <div className="mapOverlay">
      <Randomizer />
      <Search />
    </div>
  )
}

export default MapOverlay;