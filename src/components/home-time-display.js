import React from 'react';
import PropTypes from 'prop-types';

const HomeTimeDisplay = (props) => {
  const {
    days, hr, minutes, title,
  } = props;
  return (
    <div className="home-timer-container">
      <p className="t-title">{title}</p>
      <div className="home-timer">
        <span className="span-container">
          {days}
          <br />
          <span>
            Days
          </span>
        </span>
        <span className="span-container">
          {hr}
          <br />
          <span>
            Hours
          </span>
        </span>
        <span className="span-container">
          {minutes}
          <br />
          <span>
            Minutes
          </span>
        </span>
      </div>
    </div>
  );
};

HomeTimeDisplay.propTypes = {
  days: PropTypes.number.isRequired,
  hr: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default HomeTimeDisplay;
