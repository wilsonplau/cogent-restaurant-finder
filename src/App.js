import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { updateRestaurantsAsync } from './actions/actionCreators.js';
import './styles/Reset.scss';
import './styles/App.scss';
import Map from './components/Map.js';
import MapOverlay from './components/MapOverlay.js';

const App = ({ updateRestaurantsAsync }) => {
  useEffect(() => { updateRestaurantsAsync() }, [updateRestaurantsAsync])

  return (
    <div className="app">
      <MapOverlay />
      <Map />
    </div>
  );
}

export default connect(null, { updateRestaurantsAsync })(App);