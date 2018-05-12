import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card.js';

const Favorites = ({ cardData, toggleFavorite }) => {
  const favoriteCards = cardData.map(card => {
    let dataCard;
    if (card.id.includes('people')) {
      const { id, favorite, name, homeworld, homeworldPop, species } = card;

      dataCard = (
        <Card 
          id={ id }
          title={ name }
          item1={ `Homeworld: ${homeworld}` }
          item2={ `Population: ${homeworldPop}` }
          item3={ `Species: ${species.join(', ')}` }
          favorite={ favorite }
          toggleFavorite={ toggleFavorite }
          key={ id }
        />
      )

    } else if (card.id.includes('planets')) {
      const { id, favorite, name, population, climate, terrain, residents } = card;

      dataCard = (
        <Card
          id={ id }
          title={ name }
          item1={ `Population: ${population}` }
          item2={ `Climate: ${climate}` }
          item3={ `Terrain: ${terrain}` }
          item4={ `Residents: ${residents.join(', ')}` }
          favorite={ favorite }
          toggleFavorite={ toggleFavorite }
          key={ id }
        />
      )

    } else if (card.id.includes('vehicles')) {
      const { id, favorite, name, vehicleClass, model, numberOfPassengers } = card;

      dataCard = (
        <Card
          id={ id }
          title={ name }
          item1={ `Class: ${vehicleClass}` }
          item2={ `Model: ${model}` }
          item3={ `Total Passengers: ${numberOfPassengers}` }
          favorite={ favorite }
          toggleFavorite={ toggleFavorite }
          key={ id }
        />
      )

    }

    return dataCard;

  })
   return (
      <div className="Favorites">
        { favoriteCards }
      </div>
    );
}

Favorites.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Favorites;
