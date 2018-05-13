import React from 'react';
import { shallow } from 'enzyme';
import Favorites from './Favorites';

describe('Favorites', () => {

  it('matches the snapshot with a people card', () => {
    const mockCardData = [{
      id: 'people',
      favorite: false,
      name: 'Daniela',
      homeworld: 'earth',
      homeworldPop: 1,
      species: ['humannnn']
    }];
    const wrapper = shallow(
      <Favorites
        cardData={ mockCardData }
        toggleFavorite={ jest.fn() }
      /> 
    );

    expect(wrapper).toMatchSnapshot();
  })
  
  it('matches the snapshot with a planet card', () => {
    const mockCardData = [{
      id: 'planets',
      favorite: false,
      name: 'Daniela',
      climate: 'hot',
      terrain: 'soft',
      population: 1,
      residents: ['me']
    }];
    const wrapper = shallow(
      <Favorites
        cardData={ mockCardData }
        toggleFavorite={ jest.fn() }
      /> 
    );

    expect(wrapper).toMatchSnapshot();
  })

  it('matches the snapshot with a vehicle card', () => {
    const mockCardData = [{
      id: 'vehicles',
      favorite: false,
      name: 'Daniela',
      vehicleClass: 'car',
      model: 'cool',
      numberOfPassengers: 1
    }];
    const wrapper = shallow(
      <Favorites
        cardData={ mockCardData }
        toggleFavorite={ jest.fn() }
      /> 
    );

    expect(wrapper).toMatchSnapshot();
  })

  it('matches the snapshot with multiple cards', () => {
    const mockCardData = [{
      id: 'vehicles',
      favorite: false,
      name: 'Daniela',
      vehicleClass: 'car',
      model: 'cool',
      numberOfPassengers: 1
    },
      {
        id: 'planets',
        favorite: false,
        name: 'Daniela',
        climate: 'hot',
        terrain: 'soft',
        population: 1,
        residents: ['me']
      },
      {
        id: 'people',
        favorite: false,
        name: 'Daniela',
        homeworld: 'earth',
        homeworldPop: 1,
        species: ['humannnn']
      }

    ];
    const wrapper = shallow(
      <Favorites
        cardData={ mockCardData }
        toggleFavorite={ jest.fn() }
      /> 
    );

    expect(wrapper).toMatchSnapshot();
  })

});

