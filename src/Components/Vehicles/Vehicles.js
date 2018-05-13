import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card.js';

const Vehicles = ({ cardData, toggleFavorite }) => {
  const vehiclesCards = cardData.map(card => {
    const { 
      id, 
      favorite, 
      name, 
      vehicleClass, 
      model, 
      numberOfPassengers 
    } = card;

    return (
      <Card
        id={ id }
        title={ name }
        item1={ `Class: ${vehicleClass}` }
        item2={ `Model: ${model}` }
        item3={ `Total Passengers: ${numberOfPassengers}` }
        favorite={ favorite }
        section='Vehicles'
        toggleFavorite={ toggleFavorite }
        key={ id }
      />
    );
  });

  return (
    <div className="card-container Vehicles">
      { vehiclesCards }
    </div>
  );
};

Vehicles.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFavorite: PropTypes.func.isRequired
};

export default Vehicles;
