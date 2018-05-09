import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card.js';

const People = ({ cardData }) => {
  const peopleCards = cardData.map(card => {
    return (
      <Card 
        section='people'
        { ...card }
      />
    )
  })

  return (
    <div className="People">
      { peopleCards }
    </div>
  );
}

People.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default People;
