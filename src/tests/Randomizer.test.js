import React from 'react';
import { shallow } from 'enzyme';
import { Randomizer } from '../components/Randomizer.js';

describe('Randomizer', () => {
  it('should render a button with text containing random', () => {
    const component = shallow(<Randomizer />);
    expect(component.find('button').exists()).toBeTruthy();
    expect(component.text()).toContain("random");
  });
  it('should call the randomizeRestaurant function passed into it when clicked', () => {
    const mockRandomizeRestaurant = jest.fn();
    const component = shallow(<Randomizer randomizeRestaurant={mockRandomizeRestaurant} />);
    component.find('button').simulate('click');
    expect(mockRandomizeRestaurant).toBeCalled();
  });
});