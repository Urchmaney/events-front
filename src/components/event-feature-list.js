import React from 'react';
import EventFeature from './event-feature';

const EventFeatureList = () => (
  <div className="event-feature-list">
    <EventFeature fontType="calendar-alt" title="Agenda" />
    <EventFeature fontType="users" title="Speakers" />
    <EventFeature fontType="archway" title="Exhibitors" />
    <EventFeature fontType="comment-alt" title="Contact Us" />
  </div>
);

export default EventFeatureList;
