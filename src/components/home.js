/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeTimeDisplay from './home-time-display';
import EventFeatureList from './event-feature-list';
import HomeMenu from './home-meun';
import Header from './header';
import {
  allEventUrl, daysInMillSec, minutesInMilliSec, hoursInMilliSec,
} from '../constants';
import { get } from '../services/call';
import objectIsEmpty from '../services/objectCheck';
import { changeEvent, logout } from '../actions/index';
import '../styles/style.scss';

const getDayDiff = milliSec => milliSec / daysInMillSec;
const getHourDiff = milliSec => milliSec / hoursInMilliSec;
const getMinutesDiff = milliSec => milliSec / minutesInMilliSec;
const getDateDiffComponents = (date) => {
  if (date) {
    const diff = date - new Date();
    const days = date ? Math.floor(getDayDiff(diff)) : '-';
    const hours = date ? Math.floor(getHourDiff(diff - (days * daysInMillSec))) : '-';
    const minutes = date ? Math.floor(getMinutesDiff(diff - (days * daysInMillSec) - (hours * hoursInMilliSec))) : '-';
    return { days, hours, minutes };
  }
  return { days: '-', hours: '-', minutes: '-' };
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOn: false,
      shift: 0,
    };
    this.showMenu = this.showMenu.bind(this);
    this.HideMenu = this.HideMenu.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const { token, event, setEvent } = this.props;
    if (objectIsEmpty(event)) {
      const getResult = get(allEventUrl, token);
      getResult.then((result) => {
        if (!result.error && result.length > 0) {
          setEvent(result[0]);
        }
      });
    }
  }

  onLogout() {
    const { logout, history } = this.props;
    logout();
    history.push('/login');
  }

  returnHome() {
    const { history } = this.props;
    history.push('/');
  }

  showMenu() {
    this.setState({
      menuOn: true,
      shift: 100,
    });
  }

  HideMenu() {
    this.setState({
      menuOn: false,
      shift: 0,
    });
  }

  render() {
    const {
      isLoggedIn, event, history, isAdmin,
    } = this.props;
    const { menuOn, shift } = this.state;
    const {
      HideMenu, showMenu, onLogout,
    } = this;
    const { days, hours, minutes } = getDateDiffComponents(
      objectIsEmpty(event) ? null : new Date(event.start),
    );
    const shiftStyle = {
      left: shift,
    };
    if (!isLoggedIn) {
      return (<Redirect to="/login" />);
    }
    return (
      <div className="container">
        <HomeMenu
          onClick={HideMenu}
          show={menuOn}
          history={history}
          logout={onLogout}
          isAdmin={isAdmin}
        />
        <div className="content-main" style={shiftStyle}>
          <Header fontType="bars" title="Home" onClick={showMenu} notifyIcon />
          <HomeTimeDisplay
            days={Number(days)}
            hr={Number(hours)}
            minutes={Number(minutes)}
            title={event.title}
          />
          <EventFeatureList history={history} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.loggedIn,
  token: state.token,
  event: state.event,
  isAdmin: state.isAdmin,
});

const mapDispatchToProps = dispatch => ({
  setEvent: (event) => { dispatch(changeEvent(event)); },
  logout: () => { dispatch(logout()); },
});

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
