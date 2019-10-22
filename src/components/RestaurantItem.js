import React from 'react';
import { connect } from 'react-redux';
import { setSelectedRestaurant } from '../actions/actionCreators.js';
import '../styles/RestaurantItem.scss';

export const RestaurantItem = ({ restaurant, active, setSelectedRestaurant }) => {
  const { id, name, categories, location } = restaurant;
  return (
    <div className="restaurantItem" id={`restaurantItem-${id}`} aria-selected={active} onClick={() => setSelectedRestaurant(id)}>
      <h1 className="restaurantItem__name">{ name }</h1>
      <h2 className="restaurantItem__address">{ location.address }<br />{ location.crossStreet }</h2>
      <div className="restaurantItem__bottom">
        { categories.map(({ pluralName }) => <p className="restaurantItem__tag" key={pluralName}>{ pluralName }</p>) }
        <p className="restaurantItem__distance">{ location.distance }m</p>
      </div>      
    </div>
  )
}

export default connect(null, { setSelectedRestaurant })(RestaurantItem);