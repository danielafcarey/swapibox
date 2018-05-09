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
    const peopleData = await this.createPeopleData(data.results);

    return peopleData;
  }

  createPeopleData = (people) => {
    const peoplePromises = people.map( async (person) => {
      const name = person.name;
      const species = await this.getSpeciesData(person.species);
      const homeworldInfo = await this.getPersonPlanetData(person.homeworld);

      return { ...homeworldInfo, name, species };
    })

    return Promise.all(peoplePromises);
  }

  getSpeciesData = (speciesUrls) => {
    const species = speciesUrls.map( async (speciesUrl) => {
      const response = await fetch(speciesUrl);
      const data = await response.json();
      const speciesName = data.name;

      return speciesName;
    })

    return Promise.all(species);
  }

  getPersonPlanetData = async (planetUrl) => {
    const response = await fetch(planetUrl);
    const data = await response.json();
    const homeworld = data.name;
    const homeworldPop = data.population;

    return { homeworld, homeworldPop } 
  }

  getPlanetsData = async () => {
    const response = await fetch(this.planetsUrl);
    const data = await response.json();
    const planetsData = await this.createPlanetsData(data.results);

    return planetsData;
  }

  createPlanetsData = (planets) => {
    const planetsPromises = planets.map( async (planet) => {
      const name = planet.name;
      const terrain = planet.terrain;
      const population = planet.population;
      const climate = planet.climate;
      const residents = await this.getPlanetResidents(planet.residents);

      return { name, terrain, population, climate, residents };
    })

    return Promise.all(planetsPromises);
  }

  getPlanetResidents = (residentUrls) => {
    const residentsPromises = residentUrls.map( async (residentUrl) => {
      const response = await fetch(residentUrl);
      const data = await response.json();
      const residentName = data.name;

      return residentName;
    })

    return Promise.all(residentsPromises);
  }

  getVehiclesData = async () => {

  }






}
