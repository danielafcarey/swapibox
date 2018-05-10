import React from 'react';
import PropTypes from 'prop-types';

const Card = (props) => {
  const {
    title,
    item1,
    item2,
    item3,
    item4
  } = props;

  return (
    <div className="Card">
      <h3 className="title">{ title }</h3>
      <button><img src={require('../../images/lightsaber-white.png')} /></button>
      <div className="info-list">
        <h4 className="info">{ item1 }</h4>
        <h4 className="info">{ item2 }</h4>
        <h4 className="item3">{ item3 }</h4>
        <h4 className="item4">{ item4 }</h4>
      </div>
    </div>

  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  item1: PropTypes.string.isRequired,
  item2: PropTypes.string.isRequired,
  item3: PropTypes.string.isRequired,
  item4: PropTypes.string
}

export default Card;
