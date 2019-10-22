import axios from 'axios';
import defaultLocation from '../config/defaultLocation.js';

const RESTAURANT_CATEGORY_ID = '4d4b7105d754a06374d81259';
const FOURSQUARE_API_VERSION = '20180323';
const TARGET_RADIUS = 1000;

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
        categoryId: RESTAURANT_CATEGORY_ID,
        radius: TARGET_RADIUS,
        v: FOURSQUARE_API_VERSION,
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
        categoryId: RESTAURANT_CATEGORY_ID,
        radius: TARGET_RADIUS,
        v: FOURSQUARE_API_VERSION,
        limit: 50,
        query
      }});
      const responseRestaurants = data.response.venues
      dispatch(updateRestaurants(responseRestaurants));
      dispatch(updateFilter(query));
    } catch (err) {
      console.log(err);
    }
  };
}