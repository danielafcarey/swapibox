import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  const {
    id,
    title,
    item1,
    item2,
    item3,
    item4,
    favorite,
    section,
    toggleFavorite
  } = props;

  let imgSrc;
  if (favorite) {
    imgSrc = require('../../images/lightsaber-red.png');
  } else {
    imgSrc = require('../../images/lightsaber-white.png');
  }

  return (
    <div className={`Card ${section}`}>
      <h3 className="title">{ title }</h3>
      <button 
        onClick={ () => toggleFavorite(id) }
      >
        <img 
          src={ imgSrc } 
          alt="Add to favorites"
        />
      </button>
      <div className="info-list">
        <h4 className="info">{ item1 }</h4>
        <h4 className="info">{ item2 }</h4>
        <h4 className="item3">{ item3 }</h4>
        <h4 className="item4">{ item4 }</h4>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  item1: PropTypes.string.isRequired,
  item2: PropTypes.string.isRequired,
  item3: PropTypes.string.isRequired,
  item4: PropTypes.string,
  favorite: PropTypes.bool.isRequired,
  section: PropTypes.string.isRequired,
  toggleFavorite: PropTypes.func.isRequired
};

export default Card;
