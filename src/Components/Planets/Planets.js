import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card.js';

const Planets = ({ cardData }) => {
  const planetsCards = cardData.map(card => {
    const { name, population, climate, terrain, residents } = card;

    return (
      <Card
        title={ name }
        item1={ `Population: ${population}` }
        item2={ `Climate: ${climate}` }
        item3={ `Terrain: ${terrain}` }
        item4={ `Residents: ${residents.join(', ')}` }
      />
    )
  })

  return (
    <div className="card-container Planets">
      { planetsCards } 
    </div>
  );
}

Planets.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.object).isRequired
}


export default Planets;
