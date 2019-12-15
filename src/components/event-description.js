import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './header';


const EventDescription = () => (
  <div className="event-desc">
    <Header fontType="arrow-left" title="Description" onClick={() => {}} />
    <div className="event-main">
      <div className="date-location">
        <div className="wrapper">
          <div className="img-container">
            <FontAwesomeIcon icon="home" />
          </div>
          <div className="text-container">
            <p className="title">
              Date & Time
            </p>
            <p className="date-time">
              october 15,2018 09:00am - 10:00am
            </p>
          </div>
        </div>
        <div className="wrapper">
          <div className="img-container">
            <FontAwesomeIcon icon="home" />
          </div>
          <div className="text-container">
            <p className="title">
              Date & Time
            </p>
            <p className="date-time">
              october 15,2018 09:00am - 10:00am
            </p>
          </div>
        </div>
      </div>
      <div />
      <div className="add-schedule">
        Add to Schedule
        <span>
          <FontAwesomeIcon icon="plus" />
        </span>
      </div>
    </div>

  </div>
);

export default EventDescription;
