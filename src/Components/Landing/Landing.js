import React from 'react';
import PropTypes from 'prop-types';

const Landing = ({ crawlData }) => {
  const { title, releaseDate, crawlText } = crawlData;
  return (
    <div className="Landing">
      <div className="crawl">
        <p>{ crawlText }</p>
        <div className="title">
          <h1>{ title }</h1>
          <p>{ releaseDate }</p>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  crawlData: PropTypes.shape({
    title: PropTypes.string,
    releaseDate: PropTypes.string,
    crawlText: PropTypes.string
  })
};

export default Landing;
