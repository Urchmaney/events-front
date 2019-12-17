import React from 'react';
import EventFeature from './event-feature';

const EventFeatureList = () => (
  <div className="event-feature-list">
    <EventFeature fontType="calendar-alt" title="Description" />
    <EventFeature fontType="users" title="Organizers" />
    <EventFeature fontType="archway" title="Disscussions" />
    <EventFeature fontType="comment-alt" title="Attendees" />
  </div>
);

export default EventFeatureList;
