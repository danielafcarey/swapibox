import React from 'react';
import { shallow } from 'enzyme';
import People from './People';

describe('People', () => {

  it('matches the snapshot with one card', () => {
    const mockCardData = [{
      id: 1,
      favorite: false,
      name: 'Daniela',
      homeworld: 'Earth',
      homeworldPop: 7000000000,
      species: ['pupper']
    }];
    const wrapper = shallow(
      <People 
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
      homeworld: 'Earth',
      homeworldPop: 7000000000,
      species: ['pupper']
    },
      {
        id: 1,
        favorite: false,
        name: 'Daniela',
        homeworld: 'Earth',
        homeworldPop: 7000000000,
        species: ['pupper']
      }];
    const wrapper = shallow(
      <People 
        cardData={ mockCardData }
        toggleFavorite={ jest.fn() }
      /> 
    );

    expect(wrapper).toMatchSnapshot();
  })

});

