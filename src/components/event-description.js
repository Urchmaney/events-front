/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get, post } from '../services/call';
import Header from './header';
import Organizers from './organizer';
import { organizersUrl, myEventUrl } from '../constants';

const isEventPresent = (events, event) => events.some(e => e.id === event.id);


class EventDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = { organizers: {}, events: [] };
    this.returnHome = this.returnHome.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
  }

  componentDidMount() {
    const { event, token } = this.props;
    const getResult = get(organizersUrl(event.id), token);
    getResult.then((result) => {
      if (!result.error) {
        this.setState({ organizers: result, events: [] });
      }
    });
    const getResulte = get(myEventUrl, token);
    getResulte.then((result) => {
      if (!result.error) {
        this.setState(state => ({ organizers: state.organizers, events: result }));
      }
    });
  }

  returnHome() {
    const { history } = this.props;
    history.push('/');
  }

  handleAddEvent() {
    const { event, token } = this.props;
    const postResult = post(myEventUrl, { id: event.id }, token);
    postResult.then((result) => {
      if (!result.error) {
        this.setState(state => ({ organizers: state.organizers, events: result }));
      }
    });
  }

  render() {
    const { organizers, events } = this.state;
    const { history, event } = this.props;
    const { returnHome, handleAddEvent } = this;
    let addComp = '';
    if (isEventPresent(events, event)) {
      addComp = (
        <div className="add-schedule green-bg">
          Own
          <span>
            <FontAwesomeIcon icon="check" />
          </span>
        </div>
      );
    } else {
      addComp = (
        <div className="add-schedule" onClick={handleAddEvent} onKeyDown={() => {}} role="presentation">
      Add to Schedule
          <span>
            <FontAwesomeIcon icon="plus" />
          </span>
        </div>
      );
    }
    return (
      <div className="event-desc">
        <Header fontType="arrow-left" title="Description" onClick={returnHome} />
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
                  {new Date(event.created_at).toString().split(' ', 4).join(' ')}
                </p>
              </div>
            </div>
            <div className="wrapper">
              <div className="img-container">
                <FontAwesomeIcon icon="home" />
              </div>
              <div className="text-container">
                <p className="title">
                location
                </p>
                <p className="date-time">
                  {event.location}
                </p>
              </div>
            </div>
          </div>
          <div />
          {
           addComp
         }
        </div>
        <div className="desc-main">
          <h3 className="desc-title">Description</h3>
          <p className="desc-body">
            {event.description}
          </p>
        </div>
        <div>
          {
            Object.keys(organizers).map(key => (
              <Organizers
                key={key}
                title={key}
                people={organizers[key]}
              />
            ))
          }
        </div>
        <div>
          <div
            className="add-schedule"
            onClick={() => { history.push('/event/discussion'); }}
            onKeyDown={() => {}}
            role="presentation"
          >
          Join Conversation
            <span>
              <FontAwesomeIcon icon="comment" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event,
  token: state.token,
});

EventDescription.propTypes = {
  history: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(EventDescription);
