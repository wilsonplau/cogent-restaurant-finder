import rootReducer from '../reducers/rootReducer.js';

describe('rootReducer', () => {
  const initialState = {
    restaurants: [],
    filteredRestaurants: [],
    selectedRestaurant: null,
    filter: ""
  }
  const restaurantMock = {
    id: "restaurantId",
    name: "restaurantName",
    location: {
      address: "Address 1",
      crossStreet: "Address 2",
      distance: 500
    },
    categories: [{ pluralName: "Food Restaurant"}]
  }
  
  it('should return the state if no action is given', () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });
  it('should update the restaurants with UPDATE_RESTAURANTS', () => {
    const restaurants = [restaurantMock, restaurantMock, restaurantMock];
    const action = { type: 'UPDATE_RESTAURANTS', restaurants }
    expect(rootReducer(undefined, action)).toEqual({
      ...initialState, 
      restaurants,
      filteredRestaurants: restaurants
    });
  });
  it('should update the filter with UDPATE_FILTER', () => {
    const filter = "testFilter";
    const action = { type: 'UPDATE_FILTER', filter }
    expect(rootReducer(undefined, action)).toEqual({
      ...initialState,
      filter
    });
  });
  it('should update the selectedRestaurant with SET_SELECTED_RESTAURANT', () => {
    const restaurants = [restaurantMock, restaurantMock, restaurantMock];
    const restaurantId = "restaurantId";
    const action = { type: 'SET_SELECTED_RESTAURANT', restaurantId }
    expect(rootReducer({...initialState, restaurants, filteredRestaurants: restaurants}, action)).toEqual({
      ...initialState,
      restaurants, 
      filteredRestaurants: restaurants,
      selectedRestaurant: restaurantMock
    });
  });
  it('should randomize the selectedRestaurant with RANDOMIZE_RESTAURANT', () => {
    const restaurants = [restaurantMock, restaurantMock, restaurantMock];
    const action = { type: 'RANDOMIZE_RESTAURANT'}
    expect(rootReducer({...initialState, restaurants, filteredRestaurants: restaurants}, action)).toEqual({
      ...initialState,
      restaurants, 
      filteredRestaurants: restaurants,
      selectedRestaurant: restaurantMock
    });
  });
});