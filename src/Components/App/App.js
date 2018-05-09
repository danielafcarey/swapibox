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
      selectedData: {},
      crawlData: {} 
    }
  }

  // componentDidMount = async () => {
  //   const crawlData = await apiHelper.getCrawlData();

  //   this.setState({ crawlData })
  // }

  changeCategory = (event) => {
    const buttonName = event.target.name;
    if (buttonName === 'People') {
      this.getPeopleData();
    } else if (buttonName === 'Planets') {
      this.getPlanetsData();
    } else if (buttonName === 'Vehicles') {
      this.getVehiclesData();
    } else if (buttonName === 'Favorites') {
      this.getFavoritesData();
    }

    this.changeSelectedButton(buttonName);
  }

  changeSelectedButton = (selectedButton) => {
    this.setState({ selectedButton });
  }

  changeDataState = (data) => {
    this.setState({ selectedData: data });
  }

  getPeopleData = async () => {
    const peopleData = await apiHelper.getPeopleData();
    this.changeDataState(peopleData);
  }

  getPlanetsData = async () => {
    const planetsData = await apiHelper.getPlanetsData();
    this.changeDataState(planetsData);
  }

  getVehiclesData = async () => {
    const vehiclesData = await apiHelper.getVehiclesData();
    this.changeDataState(vehiclesData);
  }

  getFavoritesData = () => {

  }

  getDisplayElements = () => {
    if (!this.state.selectedButton) {
      return <Landing crawlData={ this.state.crawlData }/> 
    } else {
      return this.getCardsDisplay();        
    }
  }

  getCardsDisplay = () => {
    const { selectedButton, selectedData } = this.state;
    // per React docs: https://reactjs.org/docs/jsx-in-depth.html
    // const CardsDisplay = selectedButton; 
    // return <CardsDisplay cardData={ selectedData } />
    if (selectedButton === 'People') {
      return <People cardData={ selectedData } />;
    } else if (selectedButton === 'Planets') {
      return <Planets cardData={ selectedData } />;
    } else if (selectedButton === 'Vehicles') {
      return <Vehicles cardData={ selectedData } />;
    } else if (selectedButton === 'Favorites') {
      return <Favorites cardData={ selectedData } />;
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
