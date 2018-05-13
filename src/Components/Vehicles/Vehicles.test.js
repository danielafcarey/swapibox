import React from 'react';
import { shallow } from 'enzyme';
import Vehicles from './Vehicles';

describe('Vehicles', () => {

  it('matches the snapshot with one card', () => {
    const mockCardData = [{
      id: 1,
      favorite: false,
      name: 'Daniela',
      vehicleClass: 'car',
      model: 'cool',
      numberOfPassengers: 1
    }];
    const wrapper = shallow(
      <Vehicles
        cardData={ mockCardData }
        toggleFavorite={ jest.fn() }
      /> 
    );

    expect(wrapper).toMatchSnapshot();
  })

  it('matches the snapshot with cards', () => {
    const mockCardData = [{
      id: 1,
      favorite: false,
      name: 'Daniela',
      vehicleClass: 'car',
      model: 'cool',
      numberOfPassengers: 1
    },
      {
        id: 1,
        favorite: false,
        name: 'Daniela',
        vehicleClass: 'car',
        model: 'cool',
        numberOfPassengers: 1
      }
    ];
    const wrapper = shallow(
      <Vehicles
        cardData={ mockCardData }
        toggleFavorite={ jest.fn() }
      /> 
    );

    expect(wrapper).toMatchSnapshot();
  })

});

