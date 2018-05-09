import React from 'react';
import PropTypes from 'prop-types';

const People = ({ cardData }) => {
   return (
      <div className="People">
      </div>
    );
}

People.propTypes = {
  cardData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default People;
