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
      await this.getCardsDisplay();
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
    this.compareToFavorites(peopleData);
  }

  getPlanetsData = async () => {
    const planetsData = await apiHelper.getPlanetsData();
    this.compareToFavorites(planetsData);
  }

  getVehiclesData = async () => {
    const vehiclesData = await apiHelper.getVehiclesData();
    this.compareToFavorites(vehiclesData);
  }

  toggleFavorite = (cardId) => {
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
    const selectedCard = this.state.selectedData.find(data => {
      console.log(data, data.id, cardId);
      return data.id === cardId;
    });

    if (!selectedCard) {
      this.removeFromFavorites(cardId);
      return;
    }

    if (selectedCard.favorite) {
      this.setState({ favorites: [...this.state.favorites, selectedCard ] });
    } else {
      this.removeFromFavorites(cardId);
    }
  }

  compareToFavorites = (selectedData) => {
    const newSelectedData = selectedData.map(data => {
      if (this.state.favorites.find(favorite => favorite.id === data.id)) {
        data.favorite = true;
      }
      
      return data;
    }) 

    this.changeDataState(newSelectedData);
  }

  removeFromFavorites = (cardId) => {
    const newFavorites = this.state.favorites.filter(favorite => {
      return favorite.id !== cardId
    })

    this.setState({ favorites: newFavorites })
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
    if (selectedButton === 'People' && selectedData[0].homeworld) {
      return (
        <People 
          cardData={ selectedData } 
          toggleFavorite={ this.toggleFavorite }  
        />
      );    
    } else if (selectedButton === 'Planets' && selectedData[0].climate) {
      return (
        <Planets 
          cardData={ selectedData }
          toggleFavorite={ this.toggleFavorite } 
        />
      );
    } else if (selectedButton === 'Vehicles' && selectedData[0].model) {
      return (
        <Vehicles 
          cardData={ selectedData } 
          toggleFavorite={ this.toggleFavorite } 
        />
      );
    } else if (selectedButton === 'Favorites') {
      return (
        <Favorites 
          cardData={ favorites } 
          toggleFavorite={ this.toggleFavorite }
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
