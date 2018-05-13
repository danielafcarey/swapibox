import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

describe('Navigation', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      changeCategory: jest.fn(),
      selectedButton: ''
    };
    wrapper = shallow(<Navigation { ...props } />) 
  })

  it('should match the snapshot', () => {
    props.selectedButton = 'People';

    expect(wrapper).toMatchSnapshot();
  })

  it('should match the snapshot if no button is selected', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should change the value of peopleClass if the selectedButton is People', () => {
    props.selectedButton = 'People';
    wrapper = shallow(<Navigation { ...props } />)
    const selectedButton = wrapper.find('button.selected');

    expect(selectedButton.props().name).toEqual('People');
  })

  it('should change the value of planetsClass if the selectedButton is Planets', () => {
    props.selectedButton = 'Planets';
    wrapper = shallow(<Navigation { ...props } />)
    const selectedButton = wrapper.find('button.selected');

    expect(selectedButton.props().name).toEqual('Planets');
  })

  it('should change the value of vehiclesClass if the selectedButton is Vehicles', () => {
    props.selectedButton = 'Vehicles';
    wrapper = shallow(<Navigation { ...props } />)
    const selectedButton = wrapper.find('button.selected');

    expect(selectedButton.props().name).toEqual('Vehicles');
  })

  it('should change the value of favoritesClass if the selectedButton is Favorites', () => {
    props.selectedButton = 'Favorites';
    wrapper = shallow(<Navigation { ...props } />)
    const selectedButton = wrapper.find('button.selected');

    expect(selectedButton.props().name).toEqual('Favorites');
  })



})

