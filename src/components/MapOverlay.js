import React from 'react';
import Randomizer from './Randomizer.js';
import '../styles/MapOverlay.scss';
const MapOverlay = () => {
  return (
    <div className="mapOverlay">
      <Randomizer />
    </div>
  )
}

export default MapOverlay;