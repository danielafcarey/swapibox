import React from 'react';
import { shallow } from 'enzyme';
import Planets from './Planets';

describe('Planets', () => {

  it('matches the snapshot with one card', () => {
    const mockCardData = [{
      id: 1,
      favorite: false,
      name: 'Daniela',
      climate: 'hot',
      population: 7000000000,
      residents: ['pupper'],
      terrain: 'rocks'
    }];
    const wrapper = shallow(
      <Planets
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
      climate: 'hot',
      population: 7000000000,
      residents: ['pupper'],
      terrain: 'rocks'
    },
      {
        id: 1,
        favorite: false,
        name: 'Daniela',
        climate: 'hot',
        population: 7000000000,
        residents: ['pupper'],
        terrain: 'rocks'
      }
    ];
    const wrapper = shallow(
      <Planets
        cardData={ mockCardData }
        toggleFavorite={ jest.fn() }
      /> 
    );

    expect(wrapper).toMatchSnapshot();
  })

});

