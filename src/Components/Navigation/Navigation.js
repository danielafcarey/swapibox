import React from 'react';

const Navigation = ({ selectedButton, changeCategory }) => {
  let showSelectMessage;
  selectedButton ? showSelectMessage = 'hide' : showSelectMessage = 'showSelectMessage'

  return (
    <div className='Navigation'>
      <button 
        className='people-button'
        name='people'
        onClick={ changeCategory }
      >People</button>
      <button 
        className='planets-button'
        name='planets'
        onClick={ changeCategory }  
      >Planets</button>
      <button 
        className='vehicles-button'
        name='vehicles'
        onClick={ changeCategory }  
      >Vehicles</button>
      <button 
        className='favorites-button'
        name='favorites'
        onClick={ changeCategory }  
      >Favorites</button>
      <h3 className={ showSelectMessage }>Select a category</h3>
    </div>
  );
}

export default Navigation;
