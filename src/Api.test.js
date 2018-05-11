import ApiHelper from './Api.js';
import { mockFilmData } from './mockdata/swapi-films.js';
import { mockPeopleData } from './mockdata/swapi-people.js';
import { mockSpeciesData } from './mockdata/swapi-species.js';
import { mockVehiclesData } from './mockdata/swapi-vehicles.js';
import { mockPlanetsData } from './mockdata/swapi-planets.js';
import { peopleReturn, planetsReturn, vehicleReturn } from './mockdata/swapi-return-data.js';

describe('ApiHelper', () => {
  let apiHelper;

  describe('getCrawlData', () => {

    beforeEach(() => {
      apiHelper = new ApiHelper();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockFilmData)
      }))
    })

    it('calls fetch with the correct arguments', async () => {
      const filmsUrl = 'http://swapi.co/api/films/';
      await apiHelper.getCrawlData();

      expect(window.fetch).toHaveBeenCalledWith(filmsUrl);
    })

    it('calls createCrawlData with the correct arguments', async () => {
      const expectedArgs = mockFilmData.results;
      apiHelper.createCrawlData = jest.fn();

      await apiHelper.getCrawlData();

      expect(apiHelper.createCrawlData).toHaveBeenCalledWith(expectedArgs);
    })

    it('returns an object with crawlText, title, and releaseDate', async () => {
      // how do I mock this connection since createCrawlData is getting a random film based on a randomly generated number and I can't control the arguments passed into createCrawlData from getCrawlData?

    })

    it('throws an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('getCrawlData: Error: Status failure: 500'); 
      const result = apiHelper.getCrawlData();

      expect(result).rejects.toEqual(expected);
    })

    it('throws an error if there is a fetch error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failure')))
      const expected = Error('getCrawlData: Error: Fetch failure');
      const result = apiHelper.getCrawlData();

      expect(result).rejects.toEqual(expected);
    })

  })


  describe('createCrawlData', () => {
    it('returns an object with crawlText, title, and releaseDate', () => {
      const mockFilm = mockFilmData.results.slice(0,1);
      const expected = {
        crawlText: mockFilm[0].opening_crawl,
        title: mockFilm[0].title,
        releaseDate: mockFilm[0].release_date
      }
      const result = apiHelper.createCrawlData(mockFilm);

      expect(result).toEqual(expected);
    })

  })


  describe('getPeopleData', () => {
    beforeEach(() => {
      apiHelper = new ApiHelper();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockPeopleData)
      }))
    })

    it('calls fetch with the correct arguments', async () => {
      const peopleUrl = 'https://swapi.co/api/people/';
      await apiHelper.getPeopleData();

      expect(window.fetch).toHaveBeenCalledWith(peopleUrl);
    })

    it('calls createPeopleData with the correct arguments', async () => {
      const expectedArgs = mockPeopleData.results;
      apiHelper.createPeopleData = jest.fn();

      await apiHelper.getPeopleData();

      expect(apiHelper.createPeopleData).toHaveBeenCalledWith(expectedArgs);
    })

    it('returns a people object array if the promise is resolved', async () => {
      const result = await apiHelper.getPeopleData();
        
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('homeworld');
      expect(result[0]).toHaveProperty('homeworldPop');
      expect(result[0]).toHaveProperty('species');
      expect(result[0]).toHaveProperty('favorite');

    })

    it('throws an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('getPeopleData: Error: Status failure: 500'); 
      const result = apiHelper.getPeopleData();

      expect(result).rejects.toEqual(expected);
    })

    it('throws an error if there is a fetch error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failure')))
      const expected = Error('getPeopleData: Error: Fetch failure');
      const result = apiHelper.getPeopleData();

      expect(result).rejects.toEqual(expected);
    })

  })


  describe('createPeopleData', () => {
    it('calls getSpeciesData and getPersonPlanetData with the correct arguments', async () => {
      const expectedSpeciesArgs = mockPeopleData.results[0].species;
      const expectedPersonPlanetArgs = mockPeopleData.results[0].homeworld;
      const mockPeople = mockPeopleData.results.slice(0,1);
      apiHelper.getSpeciesData = jest.fn();
      apiHelper.getPersonPlanetData = jest.fn();

      await apiHelper.createPeopleData(mockPeople);

      expect(apiHelper.getSpeciesData).toHaveBeenCalledWith(expectedSpeciesArgs);
      expect(apiHelper.getPersonPlanetData).toHaveBeenCalledWith(expectedPersonPlanetArgs);
    })

    it('returns a people object array if the promise is resolved', async () => {
      const mockPeople = mockPeopleData.results.slice(0,1);
      apiHelper.getPersonPlanetData = jest.fn().mockImplementation(() => { 
        return {homeworld: '', homeworldPop: '' }
      });
      const result = await apiHelper.createPeopleData(mockPeople);

      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('homeworld');
      expect(result[0]).toHaveProperty('homeworldPop');
      expect(result[0]).toHaveProperty('species');
      expect(result[0]).toHaveProperty('favorite');
    })

  })



  describe('getSpeciesData', () => {
    let mockSpeciesUrls;
    let mockSpecies;
    let smallSpeciesData;

    beforeEach(() => {
      apiHelper = new ApiHelper();
      mockSpeciesUrls = ["https://swapi.co/api/species/1/"];
      mockSpecies = ['Hutt'];
      smallSpeciesData = mockSpeciesData.results[0]
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(smallSpeciesData)
      }))
    })

    it('calls fetch with the correct argument', async () => {
      await apiHelper.getSpeciesData(mockSpeciesUrls);
       
      expect(window.fetch).toHaveBeenCalledWith(mockSpeciesUrls[0])
    })

    it('returns an array of species names if the promise is resolved', async () => {
      const expected = mockSpecies;
      const result = await apiHelper.getSpeciesData(mockSpeciesUrls);

      expect(result).toEqual(expected);
    })

    it('throws an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('getSpeciesData: Error: Status failure: 500'); 
      const result = apiHelper.getSpeciesData(mockSpeciesUrls);

      expect(result).rejects.toEqual(expected);
    })

    it('throws an error if there is a fetch error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failure')))
      const expected = Error('getSpeciesData: Error: Fetch failure');
      const result = apiHelper.getSpeciesData(mockSpeciesUrls);

      expect(result).rejects.toEqual(expected);
    })

  })


  describe('getPersonPlanetData', () => {
    let mockPlanetUrl;
    let mockPlanet;
    let smallPlanetData;

    beforeEach(() => {
      mockPlanetUrl = "https://swapi.co/api/planets/2/";
      mockPlanet = {
        homeworld: "Alderaan",
        homeworldPop: "2000000000"
      };
      smallPlanetData = mockPlanetsData.results[0];
      apiHelper = new ApiHelper();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(smallPlanetData)
      }))
    })

    it('calls fetch with the correct argument', async () => {
      await apiHelper.getPersonPlanetData(mockPlanetUrl);
       
      expect(window.fetch).toHaveBeenCalledWith(mockPlanetUrl)
    })

    it('returns a planet object if the promise is resolved', async () => {
      const expected = mockPlanet;
      const result = await apiHelper.getPersonPlanetData(mockPlanetUrl);

      expect(result).toEqual(expected);
    })

    it('throws an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('getPersonPlanetData: Error: Status failure: 500'); 
      const result = apiHelper.getPersonPlanetData(mockPlanetUrl);

      expect(result).rejects.toEqual(expected);
    })

    it('throws an error if there is a fetch error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failure')))
      const expected = Error('getPersonPlanetData: Error: Fetch failure');
      const result = apiHelper.getPersonPlanetData(mockPlanetUrl);

      expect(result).rejects.toEqual(expected);
    })

  })


  describe('getPlanetsData', () => {
    beforeEach(() => {
      apiHelper = new ApiHelper();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockPlanetsData)
      }))
    })

    it('calls fetch with the correct arguments', async () => {
      const planetUrl = 'https://swapi.co/api/planets/';
      await apiHelper.getPlanetsData();

      expect(window.fetch).toHaveBeenCalledWith(planetUrl);
    })

    it('calls createPlanetsData with the correct arguments', async () => {
      const expectedArgs = mockPlanetsData.results;
      apiHelper.createPlanetsData = jest.fn();

      await apiHelper.getPlanetsData();

      expect(apiHelper.createPlanetsData).toHaveBeenCalledWith(expectedArgs);
    })

    it('returns a planets object array if the promise is resolved', async () => {
      const result = await apiHelper.getPlanetsData();
      
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('terrain');
      expect(result[0]).toHaveProperty('population');
      expect(result[0]).toHaveProperty('climate');
      expect(result[0]).toHaveProperty('residents');
      expect(result[0]).toHaveProperty('favorite');
    })

    it('throws an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('getPlanetsData: Error: Status failure: 500'); 
      const result = apiHelper.getPlanetsData();

      expect(result).rejects.toEqual(expected);
    })

    it('throws an error if there is a fetch error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failure')))
      const expected = Error('getPlanetsData: Error: Fetch failure');
      const result = apiHelper.getPlanetsData();

      expect(result).rejects.toEqual(expected);
    })

  })


  describe('createPlanetsData', () => {
    let mockPlanets;    

    beforeEach(() => {
      apiHelper = new ApiHelper();
      mockPlanets = mockPlanetsData.results.slice(0,1); 
    })

    it('should call getPlanetResidents with the correct args', () => {
      apiHelper.getPlanetResidents = jest.fn();
      const expectedArgs = mockPlanets[0].residents; 
      
      apiHelper.createPlanetsData(mockPlanets);

      expect(apiHelper.getPlanetResidents).toHaveBeenCalledWith(expectedArgs);
    })

    it('should return an array of objects if the promise is resolved', async () => {
      apiHelper.getPlanetResidents = jest.fn().mockImplementation(() => '')
      let results = await apiHelper.createPlanetsData(mockPlanets);

      expect(results[0]).toHaveProperty('name');
      expect(results[0]).toHaveProperty('terrain');
      expect(results[0]).toHaveProperty('population');
      expect(results[0]).toHaveProperty('climate');
      expect(results[0]).toHaveProperty('residents');
      expect(results[0]).toHaveProperty('favorite');
    })

  })


  describe('getPlanetResidents', () => {
    let mockResidentUrls;
    
    beforeEach(() => {
      apiHelper = new ApiHelper();
      mockResidentUrls = ["https://swapi.co/api/people/1/"];
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockPeopleData.results[0])
      }))
    })

    it('should call fetch with the correct arguments', async () => {
      const expectedArgs = mockResidentUrls[0];

      await apiHelper.getPlanetResidents(mockResidentUrls);

      expect(window.fetch).toHaveBeenCalledWith(expectedArgs);
    })

    it('should return an array of resident names if promise is resolved', async () => {
      const expected = [mockPeopleData.results[0].name];
      const results = await apiHelper.getPlanetResidents(mockResidentUrls);

      expect(results).toEqual(expected);
    })

    it('should throw an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('getPlanetsData: Error: Status failure: 500');
      const result = apiHelper.getPlanetResidents(mockResidentUrls);

      expect(result).rejects.toEqual(expected);
    })

    it('should throw an error if fetch failed', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failure')))
      const expected = Error('getPlanetsData: Error: Fetch failure');
      const result = apiHelper.getPlanetResidents(mockResidentUrls)

      expect(result).rejects.toEqual(expected);
    })

  })


  describe('getVehiclesData', () => {
    beforeEach(() => {
      apiHelper = new ApiHelper();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockVehiclesData)
      }))
    })

    it('should call fetch with the correct arguments', async () => {
      const expectedArgs = 'https://swapi.co/api/vehicles/';

      await apiHelper.getVehiclesData();

      expect(window.fetch).toHaveBeenCalledWith(expectedArgs);
    })

    it('should call createVehiclesData with the correct arguments', async () => {
      const expectedArgs = mockVehiclesData.results;
      apiHelper.createVehiclesData = jest.fn();

      await apiHelper.getVehiclesData();

      expect(apiHelper.createVehiclesData).toHaveBeenCalledWith(expectedArgs);
    })

    it('should return an array of vehicles objects if resolved', async () => {
      const results = await apiHelper.getVehiclesData();
      const expected = {
        name: 'Sand Crawler',
        model: 'Digger Crawler',
        vehicleClass: 'wheeled',
        numberOfPassengers: '30',
        favorite: false
      }

      expect(results[0]).toEqual(expected);
    })

    it('should throw an error if status is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('getVehiclesData: Error: Status failure: 500');
      const result = apiHelper.getVehiclesData();

      expect(result).rejects.toEqual(expected);
    })

    it('should throw an error if fetch failed', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failure')))
      const expected = Error('getVehiclesData: Error: Fetch failure');
      const result = apiHelper.getVehiclesData();

      expect(result).rejects.toEqual(expected);
    })

  })


  describe('createVehiclesData', () => {
    it('should return an array of vehicle objects if resolved', () => {
      const results = apiHelper.createVehiclesData(mockVehiclesData.results); 
      const expected = {
        name: 'Sand Crawler',
        model: 'Digger Crawler',
        vehicleClass: 'wheeled',
        numberOfPassengers: '30',
        favorite: false
      }

      expect(results[0]).toEqual(expected);
    })

  })


})
