import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { updateRestaurantsAsync } from './actions/actionCreators.js';

import './styles/Reset.scss';
import './styles/App.scss';
const App = ({ updateRestaurantsAsync }) => {
  useEffect(() => { updateRestaurantsAsync() }, [updateRestaurantsAsync])

  return (
    <div className="app">
    </div>
  );
}

export default connect(null, { updateRestaurantsAsync })(App);