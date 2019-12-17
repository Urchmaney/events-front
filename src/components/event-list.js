/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Event from './event';
import Header from './header';
import '../styles/style.scss';
import { get } from '../services/call';
import { allEventUrl } from '../constants';
import { changeEvent } from '../actions/index';


class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.returnHome = this.returnHome.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;
    const getResult = get(allEventUrl, token);
    getResult.then((result) => {
      if (!result.error) {
        this.setState({
          events: result,
        });
      }
    });
  }

  returnHome() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { events } = this.state;
    const { returnHome } = this;
    const { changeEvent, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return (<Redirect to="/login" />);
    }
    return (
      <div className="container">
        <Header fontType="arrow-left" title="Events" onClick={returnHome} />
        <div className="main">
          {
            events.map((event) => {
              const time = new Date(event.created_at).toString().split(' ', 4).join(' ');
              return (
                <div key={event} onClick={() => { changeEvent(event); returnHome(); }} onKeyDown={() => {}} role="presentation">
                  <Event title={event.title} location={event.location} time={time} />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  isLoggedIn: state.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  changeEvent: event => dispatch(changeEvent(event)),
});

EventList.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  changeEvent: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
