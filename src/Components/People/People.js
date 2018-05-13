import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card.js';

const People = ({ cardData, toggleFavorite }) => {
  const peopleCards = cardData.map(card => {
    const { id, favorite, name, homeworld, homeworldPop, species } = card;

    return (
      <Card 
        id={ id }
        title={ name }
        item1={ `Homeworld: ${homeworld}` }
        item2={ `Population: ${homeworldPop}` }
        item3={ `Species: ${species.join(', ')}` }
        favorite={ favorite }
        section='People'
        toggleFavorite={ toggleFavorite }
        key={ id }
      />
    )
  })

  return (
    <div className="card-container People">
      { peopleCards }
    </div>
  );
}

People.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFavorite: PropTypes.func.isRequired
}

export default People;
