import React from 'react';
import { shallow } from 'enzyme';
import { RestaurantItem } from '../components/RestaurantItem';

describe('RestaurantItem', () => {
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
  it('should render a div with text containing the name, address, distance and categories', () => {
    const component = shallow(<RestaurantItem restaurant={restaurantMock} />);
    expect(component.text()).toContain("restaurantName");
    expect(component.text()).toContain("Address 1");
    expect(component.text()).toContain("Address 2");
    expect(component.text()).toContain("500m");
    expect(component.text()).toContain("Food Restaurant");
  });
  it('should call the setSelectedRestaurant when clicked', () => {
    const mockSetSelectedRestaurant = jest.fn();
    const component = shallow(<RestaurantItem setSelectedRestaurant={mockSetSelectedRestaurant} restaurant={restaurantMock}/>);
    component.find('.restaurantItem').simulate('click');
    expect(mockSetSelectedRestaurant).toBeCalled();
  });
});