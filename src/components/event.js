import React from 'react';
import PropTypes from 'prop-types';
import Indicator from './indicator';
import '../styles/style.scss';

const Event = (props) => {
  const { title, time, location } = props;
  return (
    <div className="event">
      <Indicator />
      <p className="time-text">{time}</p>
      <div className="info-container">
        <div>
          <h2>
            {title}
          </h2>
          <p>
            {location}
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
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Event;
