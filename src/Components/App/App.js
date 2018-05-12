import React, { Component } from 'react';
import './App.css';

import Navigation from '../Navigation/Navigation.js';
import Landing from '../Landing/Landing.js';
import People from '../People/People.js';
import Planets from '../Planets/Planets.js';
import Vehicles from '../Vehicles/Vehicles.js';
import Favorites from '../Favorites/Favorites.js';

import ApiHelper from '../../Api.js';
const apiHelper = new ApiHelper();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedButton: '',
      selectedData: [],
      crawlData: {},
      favorites:  []
    }
  }

  // componentDidMount = async () => {
  //   const crawlData = await apiHelper.getCrawlData();

  //   this.setState({ crawlData })
  // }

  changeCategory = async (event) => {
    const buttonName = event.target.name;

    if (buttonName === 'People') {
      await this.getPeopleData();
    } else if (buttonName === 'Planets') {
      await this.getPlanetsData();
    } else if (buttonName === 'Vehicles') {
      await this.getVehiclesData();
    } else if (buttonName === 'Favorites') {
      await this.getFavoritesData();
    }

    await this.changeSelectedButton(buttonName);
  }

  changeSelectedButton = (selectedButton) => {
    this.setState({ selectedButton });
  }

  changeDataState = (selectedData) => {
    this.setState({ selectedData });
  }

  getPeopleData = async () => {
    const peopleData = await apiHelper.getPeopleData();
    //run this.compareToFavorites(PeopleData);
    this.compareToFavorites(peopleData);
  }

  getPlanetsData = async () => {
    const planetsData = await apiHelper.getPlanetsData();
    //run this.compareToFavorites(PeopleData);
    this.compareToFavorites(planetsData);
  }

  getVehiclesData = async () => {
    const vehiclesData = await apiHelper.getVehiclesData();
    //run this.compareToFavorites(PeopleData);
    this.compareToFavorites(vehiclesData);
  }

  addToFavorites = (cardId) => {
    const newSelectedData = this.state.selectedData.map(card => {
      if (cardId === card.id) {
        card.favorite = !card.favorite
      }

      return card;
    });

    this.setState(
      { selectedData: newSelectedData }, 
      () => this.updateFavoritesInState(cardId) 
    )
  }

  updateFavoritesInState = (cardId) => {
    const favoritedCard = this.state.selectedData.find(data => {
      return data.id === cardId
    });
    this.setState({ favorites: [...this.state.favorites, favoritedCard] });
  }

  compareToFavorites = (selectedData) => {
    // to run after getPlanets/People/VehicleData
    const newSelectedData = selectedData.map(data => {
      if (this.state.favorites.find(favorite => favorite.id === data.id)) {
        data.favorite = true;
      }
      
      return data;
    }) 

    this.changeDataState(newSelectedData);
  }

  removeFromFavorites = (cardId) => {

  }

  getDisplayElements = () => {
    if (Object.keys(this.state.selectedData).length === 0) {
      return <Landing crawlData={ this.state.crawlData }/> 
    } else {
      return this.getCardsDisplay();        
    }
  }

  getCardsDisplay = () => {
    const { selectedButton, selectedData, favorites } = this.state;
    // per React docs: https://reactjs.org/docs/jsx-in-depth.html
    // const CardsDisplay = selectedButton; 
    // return <CardsDisplay cardData={ selectedData } />
    if (selectedButton === 'People' && selectedData[0].homeworld) {
      return (
        <People 
          cardData={ selectedData } 
          addToFavorites={ this.addToFavorites }  
        />
      );    
    } else if (selectedButton === 'Planets' && selectedData[0].climate) {
      return (
        <Planets 
          cardData={ selectedData }
          addToFavorites={ this.addToFavorites } 
        />
      );
    } else if (selectedButton === 'Vehicles' && selectedData[0].model) {
      return (
        <Vehicles 
          cardData={ selectedData } 
          addToFavorites={ this.addToFavorites } 
        />
      );
    } else if (selectedButton === 'Favorites') {
      return (
        <Favorites 
          cardData={ favorites } 
          removeFromFavorites={ this.removeFromFavorites }
        />
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">swapi box</h1>
          <Navigation 
            changeCategory={ this.changeCategory }
            selectedButton={ this.state.selectedButton }/>
        </header>
        { this.getDisplayElements() } 
      </div>
    );
  }
}

export default App;
