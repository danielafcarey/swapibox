import React from 'react';

const Card = (props) => {
  const {
    section,
    name,
    homeworld,
    homeworldPop,
    species
  } = props;

  const speciesList = species.map(personSpecies => {
    return <li>{ personSpecies }</li>
  })

  let cardElements;
  if (section === 'people') {
    cardElements = 
      <div className="Card person-card">
        <h3>{ name }</h3>
        <h4>{ homeworld }</h4>
        <h4>{ homeworldPop }</h4>
        <ul>{ speciesList }</ul>
      </div>
  } else if (section === 'planets') {

  } else if (section === 'vehicles') {

  } else if (section === 'favorites') {

  }

  return cardElements 
}

export default Card;
