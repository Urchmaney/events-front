/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventFeature = (props) => {
  const {
    fontType, title, history, link,
  } = props;
  return (
    <div className="event-feature" onClick={() => history.push(link)} onKeyDown={() => {}} role="presentation">
      <FontAwesomeIcon icon={fontType} />
      <p>{title}</p>
    </div>
  );
};

EventFeature.propTypes = {
  fontType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
};

export default EventFeature;
