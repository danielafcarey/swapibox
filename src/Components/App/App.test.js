import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import ApiHelper from '../../Api.js';
const apiHelper = new ApiHelper();
import { peopleReturn, planetsReturn, vehiclesReturn } from '../../mockdata/swapi-return-data.js';

jest.mock('../../Api.js', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getCrawlData: jest.fn().mockImplementation(() => {
        return {
          crawlText: '',
          title: '',
          releaseDate: ''
        }
      }),
      getPeopleData: jest.fn().mockImplementation(() => Promise.resolve(['i am a person'])), 
      getVehiclesData: jest.fn().mockImplementation(() => Promise.resolve(['i am a vehicle'])), 
      getPlanetsData: jest.fn().mockImplementation(() => Promise.resolve(['i am a planet'])) 
    };
  });
});

describe('App', () => {
  let app;
  let appInst;

  beforeEach(() => {
    app = shallow(<App />)
    appInst = app.instance();
  })

  it('matches the snapshot', () => {
    expect(app).toMatchSnapshot();
  });

  it('sets the crawl data in state', async () => {

    expect(app.state('crawlData')).toHaveProperty('crawlText');
    expect(app.state('crawlData')).toHaveProperty('title');
    expect(app.state('crawlData')).toHaveProperty('releaseDate');
  })

  it('updates the loading state when a button is clicked', () => {
    const mockEvent = { target: { name: 'People' } };
    appInst.getPeopleData = jest.fn();

    expect(app.state('loading')).toEqual(false);

    appInst.changeCategory(mockEvent);

    expect(app.state('loading')).toEqual(true);
  })

  it('updates the loading state back to false if favorites button clicked', () => {
    const mockEvent = { target: { name: 'Favorites' } };
    appInst.getCardsDisplay = jest.fn();

    appInst.changeCategory(mockEvent);

    expect(app.state('loading')).toEqual(false);
  })
 
  it('calls getPeopleData if the people button is clicked', () => {
    const mockEvent = { target: { name: 'People' } };
    appInst.getPeopleData = jest.fn();

    appInst.changeCategory(mockEvent);
    
    expect(appInst.getPeopleData).toHaveBeenCalled();
  })

  it('calls getPlanetsData if the planets button is clicked', () => {
    const mockEvent = { target: { name: 'Planets' } };
    appInst.getPlanetsData = jest.fn();

    appInst.changeCategory(mockEvent);

    expect(appInst.getPlanetsData).toHaveBeenCalled();
  })

  it('calls getVehiclesData if the vehicles button is clicked', () => {
    const mockEvent = { target: { name: 'Vehicles' } };
    appInst.getVehiclesData = jest.fn();

    appInst.changeCategory(mockEvent);

    expect(appInst.getVehiclesData).toHaveBeenCalled();
  })

  it('calls getCardsDisplay if the favorites button is clicked', () => {
    const mockEvent = { target: { name: 'Favorites' } };
    appInst.getCardsDisplay = jest.fn();

    appInst.changeCategory(mockEvent);

    expect(appInst.getCardsDisplay).toHaveBeenCalled();
  })

  it('updates selectedButton in App state when button is selected', () => {
    const expected = 'People';

    appInst.changeSelectedButton('People');

    expect(app.state('selectedButton')).toEqual('People');
  })

  it('updates selectedData in state', () => {
    const mockSelectedData = [];
    
    appInst.changeDataState(mockSelectedData);

    expect(app.state('selectedData')).toEqual(mockSelectedData); 
  })

  it('calls compareToFavorites with peopleData', async () => {
    appInst.compareToFavorites = jest.fn();
    const mockPeopleData = ['i am a person']; 

    await appInst.getPeopleData();

    expect(appInst.compareToFavorites).toHaveBeenCalledWith(mockPeopleData);
  })

  it('calls compareToFavorites with planetsData', async () => {
    appInst.compareToFavorites = jest.fn();
    const mockPlanetsData = ['i am a planet']; 

    await appInst.getPlanetsData();

    expect(appInst.compareToFavorites).toHaveBeenCalledWith(mockPlanetsData);
  })

  it('calls compareToFavorites with vehiclesData', async () => {
    appInst.compareToFavorites = jest.fn();
    const mockVehiclesData = ['i am a vehicle']; 

    await appInst.getVehiclesData();

    expect(appInst.compareToFavorites).toHaveBeenCalledWith(mockVehiclesData);
  })

  it('toggles the favorite key on a card in state', () => {
    const prevState = [{ id: 1, favorite: false }]
    const expectedState = [{ id: 1, favorite: true }]
    app.setState({ selectedData: prevState })

    expect(app.state('selectedData')).toEqual(prevState);

    appInst.toggleFavorite(1);

    expect(app.state('selectedData')).toEqual(expectedState);
  })

  it('calls updateFavoritesInState with the cardId after toggling favorite in state', () => {
    appInst.updateFavoritesInState = jest.fn();
    const prevState = [{ id: 1, favorite: false }];
    const expectedState = [{ id: 1, favorite: true }];
    app.setState({ selectedData: prevState });

    appInst.toggleFavorite(1);

    expect(app.state('selectedData')).toEqual(expectedState);
    expect(appInst.updateFavoritesInState).toHaveBeenCalledWith(1);
  })

  it('calls removeFromFavorites with cardId if card was not found in selectedData', () => {
    const mockFavoriteCard = { id: 1, favorite: true };
    appInst.setState({ favorites: [mockFavoriteCard] });
    appInst.removeFromFavorites = jest.fn();

    appInst.updateFavoritesInState(1);

    expect(appInst.removeFromFavorites).toHaveBeenCalledWith(1);
  })

  it('adds a card to favorites if it is marked as a favorite in selectedData', () => {
    const mockSelectedData = [{ id: 2, favorite: true }];
    appInst.setState({ favorites: [], selectedData: mockSelectedData });

    appInst.updateFavoritesInState(2);

    expect(app.state('favorites')).toEqual(mockSelectedData);
  })

  it('calls removeFromFavorites with the cardId if it is not marked as a favorite in selectedData', () => {
    const mockSelectedData = [{ id: 2, favorite: false }];
    appInst.setState({ selectedData: mockSelectedData });
    appInst.removeFromFavorites = jest.fn();

    appInst.updateFavoritesInState(2);

    expect(appInst.removeFromFavorites).toHaveBeenCalledWith(2);
  })

  it('changes the value of favorite for a new data object and passes that to changeDataState', () => {
    const mockFavoriteCard = { id: 1, favorite: true };
    appInst.setState({ favorites: [mockFavoriteCard] });
    appInst.changeDataState = jest.fn();
    const mockSelectedData = [{ id: 1, favorite: false }];
    const expected = [mockFavoriteCard];

    appInst.compareToFavorites(mockSelectedData);

    expect(appInst.changeDataState).toHaveBeenCalledWith(expected);
  })

  it('removes a card from the favorites in state', () => {
    const mockFavoritesBefore = [{ id: 1, favorite: true }, {id: 2, favorite: true }];
    const expectedFavoritesAfter = [{ id: 1, favorite: true }];
    appInst.setState({ favorites: mockFavoritesBefore });

    appInst.removeFromFavorites(2);

    expect(app.state('favorites')).toEqual(expectedFavoritesAfter);
  })

  it('calls getCardsDisplay if there is selectedData in state', () => {
    appInst.getCardsDisplay = jest.fn();
    app.setState({ selectedData: [{ id: 1 }] });

    appInst.getDisplayElements();

    expect(appInst.getCardsDisplay).toHaveBeenCalled();
  })

  it('matches the snapshot if People has been selected', () => {
    app.setState({ selectedData: peopleReturn, selectedButton: 'People' });

    expect(app).toMatchSnapshot();
  })
  it('matches the snapshot if Planets has been selected', () => {
    app.setState({ selectedData: planetsReturn, selectedButton: 'Planets' });

    expect(app).toMatchSnapshot();
  })

  it('matches the snapshot if Vehicles has been selected', () => {
    app.setState({ selectedData: vehiclesReturn, selectedButton: 'Vehicles' });

    expect(app).toMatchSnapshot();
  })

  it('matches the snapshot if Favorites has been selected', () => {
    app.setState({ favorites: peopleReturn, selectedButton: 'Favorites' });

    expect(app).toMatchSnapshot();
  })



})

