import React from 'react';
import { shallow } from 'enzyme';
import { Search } from '../components/Search.js';

describe('Search', () => {
  it('should render a text input and a button', () => {
    const component = shallow(<Search />)
    expect(component.find('input[type="text"]').exists()).toBeTruthy();
    expect(component.find('button').exists()).toBeTruthy();
  });
  it('should run the search function when the form is submitted', () => {
    const searchRestaurantsAsyncMock = jest.fn();
    const component = shallow(<Search searchRestaurantsAsync={searchRestaurantsAsyncMock} />);
    component.find('input').simulate('change', {target: {value: 'tacos'}});
    component.find('button').simulate('click', { preventDefault: ()=>{} });
    expect(searchRestaurantsAsyncMock).toBeCalled();
  });
  it('should run the update function if the form is submitted with an empty string', () => {
    const updateRestaurantsAsyncMock = jest.fn();
    const component = shallow(<Search updateRestaurantsAsync={updateRestaurantsAsyncMock} />);
    component.find('button').simulate('click', { preventDefault: ()=>{} });
    expect(updateRestaurantsAsyncMock).toBeCalled();
  });
  it('should run the clear the filter if the button is pressed and filter matches input', () => {
    const updateFilterMock = jest.fn();
    const updateRestaurantsAsyncMock = jest.fn();
    const component = shallow(<Search filter={"tacos"} updateFilter={updateFilterMock} updateRestaurantsAsync={updateRestaurantsAsyncMock} />);
    component.find('input').simulate('change', {target: {value: "tacos" }});
    component.find('button').simulate('click', { preventDefault: ()=>{} });
    expect(updateRestaurantsAsyncMock).toBeCalled();
    expect(updateFilterMock).toBeCalled();
  })
});