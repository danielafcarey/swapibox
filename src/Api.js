export default class ApiHelper {
  constructor() {
    this.filmUrl = 'http://swapi.co/api/films/';
    this.peopleUrl = 'https://swapi.co/api/people/';
    this.planetsUrl = 'https://swapi.co/api/planets/';
    this.vehiclesUrl = 'https://swapi.co/api/vehicles/';
    this.speciesUrl = 'https://swapi.co/api/species/'
    this.starshipsUrl = 'https://swapi.co/api/starships/'
  }

  getCrawlData = async () => {
    try {
      const response = await fetch(this.filmUrl);

      if (response.status === 200) {
        const data = await response.json();
        return await this.createCrawlData(data.results);
      } else {
        throw Error(`Status failure: ${response.status}`);
      }

    } catch(error) {
      throw Error(`getCrawlData: ${error}`);
    }

  }

  createCrawlData = (films) => {
    const randomNumber = Math.floor(Math.random() * (films.length - 1));
    const randomFilm = films[randomNumber];
    const { opening_crawl, title, release_date } = randomFilm;

    return { 
      crawlText: opening_crawl, 
      title, 
      releaseDate: release_date 
    };
  }

  getPeopleData = async () => {
    try {
      const response = await fetch(this.peopleUrl);

      if (response.status === 200) {
        const data = await response.json();
        return await this.createPeopleData(data.results);
      } else {
        throw Error(`Status failure: ${response.status}`);
      }

    } catch(error) {
      throw Error(`getPeopleData: ${error}`);
    }
  }

  createPeopleData = (people) => {
    const peoplePromises = people.map( async (person) => {
      const name = person.name;
      const species = await this.getSpeciesData(person.species);
      const homeworldInfo = await this.getPersonPlanetData(person.homeworld);

      return { ...homeworldInfo, name, species, favorite: false };
    });

    return Promise.all(peoplePromises);
  }

  getSpeciesData = (speciesUrls) => {
    const species = speciesUrls.map( async (speciesUrl) => {
      try {
        const response = await fetch(speciesUrl);

        if (response.status === 200) {
          const data = await response.json();
          return data.name;
        } else {
          throw Error(`Status failure: ${response.status}`);
        }

      } catch(error) {
        throw Error(`getSpeciesData: ${error}`)
      }
    });

    return Promise.all(species);
  }

  getPersonPlanetData = async (planetUrl) => {
    try {
      const response = await fetch(planetUrl);

      if (response.status === 200) {
        const data = await response.json();
        const homeworld = data.name;
        const homeworldPop = data.population;
        return { homeworld, homeworldPop }; 
      } else {
        throw Error(`Status failure: ${response.status}`);
      }

    } catch(error) {
      throw Error(`getPersonPlanetData: ${error}`);
    }
  }

  getPlanetsData = async () => {
    try {
      const response = await fetch(this.planetsUrl);

      if (response.status === 200) {
        const data = await response.json();
        return await this.createPlanetsData(data.results);
      } else {
        throw Error(`Status failure: ${response.status}`);
      }

    } catch(error) {
      throw Error(`getPlanetsData: ${error}`);
    }
  }

  createPlanetsData = (planets) => {
    const planetsPromises = planets.map( async (planet) => {
      const name = planet.name;
      const terrain = planet.terrain;
      const population = planet.population;
      const climate = planet.climate;
      const residents = await this.getPlanetResidents(planet.residents);

      return { name, terrain, population, climate, residents, favorite: false };
    });

    return Promise.all(planetsPromises);
  }

  getPlanetResidents = (residentUrls) => {
    const residentsPromises = residentUrls.map( async (residentUrl) => {
      try {
        const response = await fetch(residentUrl);

        if (response.status === 200) {
          const data = await response.json();
          return data.name;
        } else {
          throw Error(`Status failure: ${response.status}`)
        }

      } catch(error) {
        throw Error(`getPlanetsData: ${error}`)
      }
    });

    return Promise.all(residentsPromises);
  }

  getVehiclesData = async () => {
    try {
      const response = await fetch(this.vehiclesUrl);

      if (response.status === 200) {
        const data = await response.json();
        return this.createVehiclesData(data.results);
      } else {
        throw Error(`Status failure: ${response.status}`);
      }

    } catch(error) {
      throw Error(`getVehiclesData: ${error}`);
    }
  }

  createVehiclesData = (vehicles) => {
    const vehiclesPromises = vehicles.map( (vehicle) => {
      const name = vehicle.name;
      const model = vehicle.model;
      const vehicleClass = vehicle.vehicle_class;
      const numberOfPassengers = vehicle.passengers;

      return { name, model, vehicleClass, numberOfPassengers, favorite: false }
    });

    return (vehiclesPromises);
  }






}
