import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventFeature = (props) => {
  const { fontType, title } = props;
  return (
    <div className="event-feature">
      <FontAwesomeIcon icon={fontType} />
      <p>{title}</p>
    </div>
  );
};

EventFeature.propTypes = {
  fontType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default EventFeature;
