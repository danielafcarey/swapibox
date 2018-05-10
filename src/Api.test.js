import ApiHelper from './Api.js';
import { mockFilmData } from './mockdata/swapi-films.js';
import { mockPeopleData } from './mockdata/swapi-people.js';

describe('ApiHelper', () => {

  let apiHelper;

  describe('Crawl Data', () => {
     
    beforeEach(() => {
      apiHelper = new ApiHelper();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockFilmData)
      }))
    })

    it('getCrawlData calls createCrawlData with the correct arguments', async () => {
      const expectedArgs = mockFilmData.results;
      apiHelper.createCrawlData = jest.fn();

      await apiHelper.getCrawlData();

      expect(apiHelper.createCrawlData).toHaveBeenCalledWith(expectedArgs);
    })

    it('createCrawlData returns am object with crawlText, title, and releaseDate', () => {
      const mockFilm = mockFilmData.results.slice(0,1);

      const expected = {
        crawlText: mockFilm[0].opening_crawl,
        title: mockFilm[0].title,
        releaseDate: mockFilm[0].release_date
      }
      const result = apiHelper.createCrawlData(mockFilm);

      expect(result).toEqual(expected);
    })

    it('getCrawlData returns an object with crawlText, title, and releaseDate', async () => {
      // how do I mock this connection since createCrawlData is getting a random film and I can't control the arguments passed into createCrawlData from getCrawlData?
    })

    it('getCrawlData throws an error if status is not ok', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }))
      const expected = Error('getCrawlData: Error: Status failure'); 
      
      expect(apiHelper.getCrawlData()).rejects.toEqual(expected);
    })

    it('getCrawlData throws an error if there is a fetch error', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(Error('Fetch failure')))
      const expected = Error('getCrawlData: Error: Fetch failure');

      expect(apiHelper.getCrawlData()).rejects.toEqual(expected);
    })
  })


  describe('People Data', () => {

    beforeEach(() => {
      apiHelper = new ApiHelper();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockFilmData)
      }))

    })
  })

})
