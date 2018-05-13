import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <img 
        src={ require('../../images/tie-fighter-yellow.png') }
        alt="Loading. Please wait."
      />
    </div>
  )
}

export default Loading;
