import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';

describe('Landing', () => {

  it('matches the snapshot', () => {
    const mockCrawlData = {
      crawlText: 'i am a movie', 
      title: 'moviem',
      releaseDate: 'today'
    }
    const wrapper = shallow(<Landing crawlData={ mockCrawlData } />)

    expect(wrapper).toMatchSnapshot();
  });

});
