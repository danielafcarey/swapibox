import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card.js';

const People = ({ cardData }) => {
  const peopleCards = cardData.map(card => {
    const { name, homeworld, homeworldPop, species } = card;

    return (
      <Card 
        title={ name }
        item1={ `Homeworld: ${homeworld}` }
        item2={ `Population: ${homeworldPop}` }
        item3={ `Species: ${species.join(', ')}` }
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
  cardData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default People;
