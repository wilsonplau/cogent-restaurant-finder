const initialState = {
  restaurants: [],
  filteredRestaurants: [],
  selectedRestaurant: null,
  filter: ""
}

const filterRestaurants = (restaurants) => restaurants.filter((restaurant) => restaurant.location.distance < 1000 );

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return {
        ...state,
        filter: action.filter
      }
    case 'UPDATE_RESTAURANTS':
      return {
        ...state,
        restaurants: action.restaurants,
        filteredRestaurants: filterRestaurants(action.restaurants)
      }
    case 'SET_SELECTED_RESTAURANT': 
      return {
        ...state,
        selectedRestaurant: state.restaurants.find((restaurant) => restaurant.id === action.restaurantId)
      }
    case 'RANDOMIZE_RESTAURANT':
      const randomIndex = Math.floor(Math.random()*state.filteredRestaurants.length);
      return {
        ...state,
        selectedRestaurant: state.filteredRestaurants[randomIndex]
      }
    default: 
      return state;
  }
}

export default rootReducer;