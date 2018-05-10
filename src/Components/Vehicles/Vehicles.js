import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card.js';

const Vehicles = ({ cardData }) => {
  const vehiclesCards = cardData.map(card => {
    const { name, vehiclesClass, model, numberOfPassengers } = card;

    return (
      <Card
        title={ name }
        item1={ `Class: ${vehiclesClass}` }
        item2={ `Model: ${model}` }
        item3={ `Total Passengers: ${numberOfPassengers}` }
      />
    )
  })

  return (
    <div className="card-container Vehicles">
      { vehiclesCards }
    </div>
  );
}

Vehicles.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.object)
}

export default Vehicles;
