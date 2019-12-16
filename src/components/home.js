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
import { changeEvent } from '../actions/index';
import '../styles/style.scss';

const getDayDiff = (milliSec) => milliSec / daysInMillSec;
const getHourDiff = (milliSec) => milliSec / hoursInMilliSec;
const getMinutesDiff = (milliSec) => milliSec / minutesInMilliSec;
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
  }

  componentDidMount() {
    const { token, event, setEvent } = this.props;
    if (objectIsEmpty(event)) {
      const getResult = get(allEventUrl, token);
      getResult.then((result) => {
        if (!result.error) {
          setEvent(result[0]);
        }
      });
    }
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
    const { isLoggedIn, event, history } = this.props;
    const { menuOn, shift } = this.state;
    const {
      HideMenu, showMenu,
    } = this;

    const { days, hours, minutes } = getDateDiffComponents(
      objectIsEmpty(event) ? null : new Date(event.created_at),
    );
    const shiftStyle = {
      left: shift,
    };
    if (!isLoggedIn) {
      return (<Redirect to="/login" />);
    }
    return (
      <div className="container">
        <HomeMenu onClick={HideMenu} show={menuOn} history={history} />
        <div className="content-main" style={shiftStyle}>
          <Header fontType="bars" title="Home" onClick={showMenu} notifyIcon />
          <HomeTimeDisplay
            days={Number(days)}
            hr={Number(hours)}
            minutes={Number(minutes)}
          />
          <EventFeatureList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.loggedIn,
  token: state.token,
  event: state.event,
});

const mapDispatchToProps = (dispatch) => ({
  setEvent: (event) => { dispatch(changeEvent(event)); },
});

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setEvent: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
