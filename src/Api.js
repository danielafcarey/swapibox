export default class ApiHelper {
  constructor() {
    this.filmUrl = 'http://swapi.co/api/films/';
    this.peopleUrl = 'https://swapi.co/api/people/';
    this.planetsUrl = 'https://swapi.co/api/planets/';
    this.vehiclesUrl = 'https://swapi.co/api/planets/';
    this.speciesUrl = 'https://swapi.co/api/species/'
    this.starshipsUrl = 'https://swapi.co/api/starships/'
  }

  getCrawlData = async () => {
    const response = await fetch(this.filmUrl);
    const data = await response.json();
    const crawlData = await this.createCrawlData(data.results);

    return crawlData;
  }

  createCrawlData = (films) => {
    const randomNumber = Math.floor(Math.random() * (films.length) + 1);
    const randomFilm = films.find(film => film.episode_id === randomNumber);
    const { opening_crawl, title, release_date } = randomFilm;

    return { 
      crawlText: opening_crawl, 
      title, 
      releaseDate: release_date } ;
  }

  getPeopleData = async () => {
    const response = await fetch(this.peopleUrl);
    const data = await response.json();
    const peopleData = await this.createPeopleData(data);

    return peopleData;
  }

  createPeopleData = (data) => {
    data.results.map( async (person) => {
            
    })
    // Name - in person.name
    // Species - array - fetch from this.speciesUrl
    // Homeworld - fetch from this.planetsUrl
    // Population of Homeworld - fetch from this.planetsUrl
  }

  getPersonSpeciesData = async (speciesUrl) => {

  }

  getPersonPlanetData = async (planetUrl) => {

  }

  getPlanetsData = async () => {

  }

  getVehiclesData = async () => {

  }






}
