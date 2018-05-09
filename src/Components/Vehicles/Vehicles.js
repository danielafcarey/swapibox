import React from 'react';
import PropTypes from 'prop-types';

const Vehicles = ({ cardData }) => {
   return (
      <div className="Vehicles">
      </div>
    );
}

Vehicles.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.object)
}

export default Vehicles;
