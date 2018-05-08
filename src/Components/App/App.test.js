import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

describe('App', () => {
  it('matches the snapshot', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });

  // unit/small implementation tests
  it('has a default state of selectedButton and selectedData', () => {
    const app = shallow(<App />);

    expect(app.state('selectedButton')).toEqual('');
    expect(app.state('selectedData')).toEqual({});
  })

  it('updates selectedButton in App state when button is selected', () => {
    const app = shallow(<App />);
    const appInst = app.instance();
    const expected = 'people';

    appInst.updateSelectedButton('people');

    expect(app.state('selectedButton')).toEqual('people');
  })

  it('updates selectedData in App state when people button is selected', () => {
    const app = shallow(<App />);
    const appInst = app.instance();
    // expected = mockCleanPeopleData
    // call appInst.getPeopleData()
    // expect that selectedData in state was changed to the mockCleanPeopleData
    // ?? Do I mock the entire object of people from the API? ??
  })

  it('updates selectedData in App state when planets button is selected', () => {
    const app = shallow(<App />);
    const appInst = app.instance();
    // expected = mockCleanPlanetsData
    // call appInst.getPlanetsData()
    // expect that selectedData in state was changed to the mockCleanPlanetsData
    // ?? Do I mock the entire object of planets from the API? ??

  })

  it('updates selectedData in App state when vehicles button is selected', () => {
    const app = shallow(<App />);
    const appInst = app.instance();
    // expected = mockCleanVehiclesData
    // call appInst.getVehiclesData()
    // expect that selectedData in state was changed to the mockCleanVehiclesData
    // ?? Do I mock the entire object of vehicles from the API? ??

  })

  it('updates selectedData in App state when favorites button is selected', () => {
    const app = shallow(<App />);
    const appInst = app.instance();
    // expected = mockCleanFavoritesData
    // call appInst.getFavoritesData()
    // expect that selectedData in state was changed to the mockCleanFavoritesData
    // ?? Do I mock the entire object of Favorites from the API? ??

  })


  // UI implementation tests
  it('shows people cards when the people button is clicked', () => {

  })

  it('shows planets cards when the planets button is clicked', () => {

  })

  it('shows vehicles cards when the vehicles button is clicked', () => {

  })

  it('shows favorited cards when the favorites button is clicked', () => {

  })
})

