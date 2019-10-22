import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import RestaurantItem from './RestaurantItem.js';
import '../styles/Results.scss';

export const Results = ({ selectedRestaurant, filteredRestaurants, filter }) => {
  const resultsRef = useRef();
  
  useEffect(() => {
    resultsRef.current.scrollTop = 0;
  }, [filteredRestaurants])

  useEffect(() => {
    if (selectedRestaurant) {
      const selectedRestaurantItem = document.querySelector(`#restaurantItem-${selectedRestaurant.id}`);
      selectedRestaurantItem.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }, [selectedRestaurant])

  return (
    <div className="results" ref={resultsRef}>
      { filteredRestaurants.length === 0 && filter && <div className="results__error">No results found.</div> }
      { filteredRestaurants
          .sort((restaurantA, restaurantB) => restaurantA.location.distance - restaurantB.location.distance)
          .map((restaurant) => 
            <RestaurantItem 
              restaurant={restaurant} 
              active={selectedRestaurant && restaurant.id === selectedRestaurant.id} 
              key={restaurant.id}
            />
          )
      }
    </div>
  )
}

const mapStateToProps = ({ selectedRestaurant, filteredRestaurants, filter }) => ({ selectedRestaurant, filteredRestaurants, filter });
export default connect(mapStateToProps)(Results);