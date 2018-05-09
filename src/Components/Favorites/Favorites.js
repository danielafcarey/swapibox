import React from 'react';
import PropTypes from 'prop-types';

const Favorites = ({ cardData }) => {
   return (
      <div className="Favorites">
      </div>
    );
}

Favorites.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Favorites;
