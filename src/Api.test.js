import ApiHelper from './Api.js';
import { mockFilmData } from './mockdata/swapi-films.js';
import { mockPeopleData } from './mockdata/swapi-people.js';

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

    it('calls createCrawlData with the correct arguments', async () => {
      const expectedArgs = mockFilmData.results;
      apiHelper.createCrawlData = jest.fn();

      await apiHelper.getCrawlData();

      expect(apiHelper.createCrawlData).toHaveBeenCalledWith(expectedArgs);
    })

    it('returns an object with crawlText, title, and releaseDate', async () => {
      // how do I mock this connection since createCrawlData is getting a random film and I can't control the arguments passed into createCrawlData from getCrawlData?
    })

    it('throws an error if status is not ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('getCrawlData: Error: Status failure: 500'); 

      expect(apiHelper.getCrawlData()).rejects.toEqual(expected);
    })

    it('throws an error if there is a fetch error', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failure')))
      const expected = Error('getCrawlData: Error: Fetch failure');

      expect(apiHelper.getCrawlData()).rejects.toEqual(expected);
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

    it('calls createPeopleData with the correct arguments', async () => {
      const expectedArgs = mockPeopleData.results;
      apiHelper.createPeopleData = jest.fn();

      await apiHelper.getPeopleData();

      expect(apiHelper.createPeopleData).toHaveBeenCalledWith(expectedArgs);
    })

    it('throws an error if status is not ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('getPeopleData: Error: Status failure: 500'); 

      expect(apiHelper.getPeopleData()).rejects.toEqual(expected);
    })

    it('throws an error if there is a fetch error', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failure')))
      const expected = Error('getPeopleData: Error: Fetch failure');

      expect(apiHelper.getPeopleData()).rejects.toEqual(expected);
    })

  })


  describe('createPeopleData', () => {

    it('calls getSpeciesData and getPersonPlanetData with the correct arguments', async () => {
      apiHelper = new ApiHelper();
      const expectedSpeciesArgs = mockPeopleData.results[0].species;
      const expectedPersonPlanetArgs = mockPeopleData.results[0].homeworld;
      const mockPeople = mockPeopleData.results.slice(0,1);;
      apiHelper.getSpeciesData = jest.fn();
      apiHelper.getPersonPlanetData = jest.fn();

      await apiHelper.createPeopleData(mockPeople);

      expect(apiHelper.getSpeciesData).toHaveBeenCalledWith(expectedSpeciesArgs);
      expect(apiHelper.getPersonPlanetData).toHaveBeenCalledWith(expectedPersonPlanetArgs);

    })

  })






})
