import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

describe('Navigation', () => {

  it('should match the snapshot', () => {
    const app = shallow(
      <Navigation 
        changeCategory={ jest.fn() } 
        selectedButton={ 'people' }
      />);
    expect(app).toMatchSnapshot();
  })

  it('should match the snapshot if no button is selected', () => {
    const app = shallow(
      <Navigation 
        changeCategory={ jest.fn() } 
        selectedButton={ '' }
      />);
    expect(app).toMatchSnapshot();

  })

  // it('should call the prop function when a button is clicked with an argument of the event.target.name', () => {
  //   const spy = jest.fn();
  //   const app = shallow(<Navigation changeCategory={ spy } />);
  //   const mockEvent = { target: { name: 'people' } }

  //   app.find('.people-button').simulate('click');
  //   expect(spy).toHaveBeenCalledWith(mockEvent.target.name); 
  // })

})

