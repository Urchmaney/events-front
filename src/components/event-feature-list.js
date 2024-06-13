/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import EventFeature from './event-feature';

const EventFeatureList = (props) => {
  const { history } = props;
  return (
    <div className="event-feature-list">
      <EventFeature fontType="calendar-alt" title="Description" history={history} link="/event/description" />
      <EventFeature fontType="archway" title="Disscussions" history={history} link="/event/discussion" />
      <EventFeature fontType="comment-alt" title="Attendees" history={history} link="/event/attendees" />
    </div>
  );
};

EventFeatureList.propTypes = {
  history: PropTypes.object.isRequired,
};

export default EventFeatureList;
