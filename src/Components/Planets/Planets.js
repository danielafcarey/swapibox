import React from 'react';
import PropTypes from 'prop-types';

const Planets = ({ cardData }) => {
   return (
      <div className="Planets">
      </div>
    );
}

Planets.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.object).isRequired
}


export default Planets;
