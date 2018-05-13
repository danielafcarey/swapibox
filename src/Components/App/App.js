import React, { Component } from 'react';
import './App.css';

import Navigation from '../Navigation/Navigation.js';
import Landing from '../Landing/Landing.js';
import People from '../People/People.js';
import Planets from '../Planets/Planets.js';
import Vehicles from '../Vehicles/Vehicles.js';
import Favorites from '../Favorites/Favorites.js';
import Loading from '../Loading/Loading.js';

import ApiHelper from '../../Api.js';
const apiHelper = new ApiHelper();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedButton: '',
      selectedData: [],
      crawlData: {},
      favorites:  [],
      loading: false
    };
  }

  componentDidMount = async () => {
    const crawlData = await apiHelper.getCrawlData();

    this.getFavoritesFromStorage();
    this.setState({ crawlData });
  }

//   componentDidUpdate = () => {
//     this.setFavoritesInStorage();
//   }

  componenetWillUnmount = () => {
    this.setFavoritesInStorage();
  }

  getFavoritesFromStorage = () => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('SWAPI'));
    this.setState({ favorites: favoritesFromStorage }); 
  }

  setFavoritesInStorage = () => {
    const stringifiedFavorites = JSON.stringify(this.state.favorites);
    localStorage.setItem('SWAPI', stringifiedFavorites);
  }

  changeCategory = async (event) => {
    const buttonName = event.target.name;
    this.setState({ loading: true });

    if (buttonName === 'People') {
      await this.getPeopleData();
    } else if (buttonName === 'Planets') {
      await this.getPlanetsData();
    } else if (buttonName === 'Vehicles') {
      await this.getVehiclesData();
    } else if (buttonName === 'Favorites') {
      this.setState({ loading: false });
      await this.getCardsDisplay();
    }

    await this.changeSelectedButton(buttonName);
  }

  changeSelectedButton = (selectedButton) => {
    this.setState({ selectedButton });
  }

  changeDataState = (selectedData) => {
    this.setState({ selectedData, loading: false });
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
        card.favorite = !card.favorite;
      }

      return card;
    });

    this.setState(
      { selectedData: newSelectedData }, 
      () => this.updateFavoritesInState(cardId) 
    );
  }

  updateFavoritesInState = (cardId) => {
    const selectedCard = this.state.selectedData.find(data => {
      return data.id === cardId;
    });

    if (!selectedCard) {
      this.removeFromFavorites(cardId);
      return;
    }

    if (selectedCard.favorite) {
      this.setState(
        { favorites: [...this.state.favorites, selectedCard] }, 
        this.setFavoritesInStorage 
      );
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
    }); 

    this.changeDataState(newSelectedData);
  }

  removeFromFavorites = (cardId) => {
    const newFavorites = this.state.favorites.filter(favorite => {
      return favorite.id !== cardId;
    });

    this.setState({ favorites: newFavorites }, this.setFavoritesInStorage);
  }

  getDisplayElements = () => {
    const { selectedData, crawlData, selectedButton } = this.state;
    if (selectedData.length === 0 && !selectedButton ) {
      return <Landing crawlData={ crawlData } /> ;
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
    const { selectedButton, loading, favorites } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">swapi box</h1>
          <Navigation 
            changeCategory={ this.changeCategory }
            selectedButton={ selectedButton }
            favoritesLength={ favorites.length }
          />
        </header>
        { loading ? <Loading /> : this.getDisplayElements() } 
      </div>
    );
  }
}

export default App;
