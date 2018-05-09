import ApiHelper from './Api.js';
import { mockFilmData } from './mockdata/swapi-films.js';

describe('ApiHelper Tests', () => {
  const apiHelper = new ApiHelper();

  it('should have default props of film, people, planets, and vehicles url', () => {

  })  

  it('should return crawl text from a random film', () => {
    
  })

  it('should find random crawl text when passed an array of films', () => {
    // const expected = mockFilmData.results[0].opening_crawl;
    // const actual = apiHelper.findCrawlText(mockFilmData.results);
    // expect(actual).toEqual(expected);
  })
})
