import React from 'react';
import Randomizer from './Randomizer.js';
import Search from './Search.js';
import Results from './Results.js';
import '../styles/MapOverlay.scss';

const MapOverlay = () => {
  return (
    <div className="mapOverlay">
      <Randomizer />
      <Search />
      <Results />
    </div>
  )
}

export default MapOverlay;