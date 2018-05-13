import React from 'react';
import PropTypes from 'prop-types';

const Navigation = (props) => {
  const { 
    selectedButton, 
    changeCategory, 
    favoritesLength 
  } = props;

  let showSelectMessage;
  selectedButton ? 
    showSelectMessage = 'hide' : 
    showSelectMessage = 'showSelectMessage';

  let peopleClass;
  if (selectedButton === 'People') {
    peopleClass = 'selected'
  }

  let planetsClass;
  if (selectedButton === 'Planets') {
    planetsClass = 'selected'
  }

  let vehiclesClass;
  if (selectedButton === 'Vehicles') {
    vehiclesClass = 'selected'
  }

  let favoritesClass;
  if (selectedButton === 'Favorites') {
    favoritesClass = 'selected'
  }

  return (
    <div className='Navigation'>
      <button 
        className={ peopleClass }
        name='People'
        onClick={ changeCategory } >
        People
      </button>
      <button 
        className={ planetsClass }
        name='Planets'
        onClick={ changeCategory } >
        Planets
      </button>
      <button 
        className={ vehiclesClass }
        name='Vehicles'
        onClick={ changeCategory } >
        Vehicles
      </button>
      <button 
        className={ favoritesClass }
        name='Favorites'
        onClick={ changeCategory } >
        Favorites ({ favoritesLength })
      </button>
      <h3 className={ showSelectMessage }>Select a category</h3>
    </div>
  );
}

Navigation.propTypes = {
  selectedButton: PropTypes.string.isRequired,
  changeCategory: PropTypes.func.isRequired,
  favoritesLength: PropTypes.number
};

export default Navigation;
