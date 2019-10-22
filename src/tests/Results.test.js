import React from 'react';
import { shallow } from 'enzyme';
import { Results } from '../components/Results.js';
import RestaurantItem from '../components/RestaurantItem.js';

describe('Results', () => {
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
  it('should render a number of RestaurantItem components based on filteredRestaurants', () => {
    const filteredRestaurantsMock = [restaurantMock, restaurantMock, restaurantMock];
    const component = shallow(<Results filteredRestaurants={filteredRestaurantsMock} />)
    expect(component.find(RestaurantItem)).toHaveLength(3);
  });

});