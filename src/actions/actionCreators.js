import axios from 'axios';
import defaultLocation from '../config/defaultLocation.js';

export const updateRestaurants = (restaurants) => {
  return {
    type: 'UPDATE_RESTAURANTS',
    restaurants
  }
}

export const updateFilter = (filter) => {
  return {
    type: 'UPDATE_FILTER',
    filter
  }
}

export const setSelectedRestaurant = (restaurantId) => {
  return {
    type: 'SET_SELECTED_RESTAURANT',
    restaurantId
  }
}

export const randomizeRestaurant = () => {
  return {
    type: 'RANDOMIZE_RESTAURANT'
  }
}

export const updateRestaurantsAsync = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://api.foursquare.com/v2/venues/explore`, { params: {
        client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
        client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
        ll: `${defaultLocation.lat},${defaultLocation.lng}`,
        categoryId: '4d4b7105d754a06374d81259',
        radius: 1000,
        v: '20180323',
        limit: 50
      }});
      const responseRestaurants = data.response.groups[0].items.map((item) => item.venue)
      dispatch(updateRestaurants(responseRestaurants));
      dispatch(updateFilter(""));
    } catch (err) {
      console.log(err);
    }
  };
}

export const searchRestaurantsAsync = (query = "") => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://api.foursquare.com/v2/venues/search`, { params: {
        client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
        client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
        ll: `${defaultLocation.lat},${defaultLocation.lng}`,
        categoryId: '4d4b7105d754a06374d81259',
        query: query,
        radius: 1000,
        v: '20180323',
        limit: 50
      }});
      const responseRestaurants = data.response.venues
      dispatch(updateRestaurants(responseRestaurants));
      dispatch(updateFilter(query));
    } catch (err) {
      console.log(err);
    }
  };
}