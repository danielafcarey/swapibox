import React, { Component } from 'react';
import './App.css';
import Navigation from '../Navigation/Navigation.js';
import Landing from '../Landing/Landing.js';
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
    if (buttonName === 'people') {
      this.getPeopleData();
    } else if (buttonName === 'planets') {
      this.getPlanetsData();
    } else if (buttonName === 'vehicles') {
      this.getVehiclesData();
    } else if (buttonName === 'favorites') {
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

  getPlanetsData = () => {
    const planetsData = await apiHelper.getPlanetsData();
    this.changeDataState(planetsData);
  }

  getVehiclesData = () => {
    const vehiclesData = await apiHelper.getVehiclesData();
    this.changeDataState(vehiclesData);
  }

  getFavoritesData = () => {
    const favoritesData = await apiHelper.getFavoritesData();
    this.changeDataState(favoritesData);
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
        {/* <Landing crawlData={ this.state.crawlData }/> */} 
      </div>
    );
  }
}

export default App;
