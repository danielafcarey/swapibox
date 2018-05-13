import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

describe('Card', () => {
  let mockProps;

  beforeEach(() => {
    mockProps = {
      id: 'id',
      title: 'is a card',
      item1: 'item1',
      item2: 'item2',
      item3: 'item3',
      item4: 'item4',
      favorite: false,
      toggleFavorite: jest.fn()
    }
  })

  it('should match the snapshot', () => {
    const wrapper = shallow(<Card { ...mockProps } />)

    expect(wrapper).toMatchSnapshot();
  })

  it('should match the snapshot if a card is a favorite', () => {
    const wrapper = shallow(<Card { ...mockProps } favorite={true} />)

    expect(wrapper).toMatchSnapshot();
  })

  it('calls the toggleFavorite function with the card id when button is clicked', () => {
    const spy = jest.fn(); 
    const wrapper = shallow(<Card { ...mockProps } toggleFavorite={spy} />);

    wrapper.find('button').simulate('click');

    expect(spy).toBeCalledWith('id');
  })
})
