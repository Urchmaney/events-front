import React from 'react';
import PropTypes from 'prop-types';
import Indicator from './indicator';
import '../styles/style.scss';

const Event = (props) => {
  const { location } = props;
  return (
    <div className="event">
      <Indicator />
      <p className="time-text">9.00 to 10</p>
      <div className="info-container">
        <div>
          <h2>
          Opening Spech
          </h2>
          <p>
          host
            <span>{location}</span>
          </p>
        </div>
        <span className="interested">
          Interested
        </span>
      </div>
    </div>

  );
};

Event.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Event;
