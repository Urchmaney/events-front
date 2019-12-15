import React from 'react';
import PropTypes from 'prop-types';

const HomeTimeDisplay = (props) => {
  const { days, hr, minutes } = props;
  return (
    <div className="home-timer-container">
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
  days: PropTypes.string.isRequired,
  hr: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
};

export default HomeTimeDisplay;
