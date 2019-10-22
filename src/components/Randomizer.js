import React from 'react';
import { connect } from 'react-redux';
import { randomizeRestaurant } from '../actions/actionCreators.js';
import '../styles/Randomizer.scss';
import diceIcon from '../assets/images/dice.svg';

export const Randomizer = ({ randomizeRestaurant }) => (
  <button className="randomizer" onClick={randomizeRestaurant}>
    <img src={diceIcon} alt="A pair of dice" />
    Roll for a random restaurant
  </button>
)

export default connect(null, { randomizeRestaurant })(Randomizer);