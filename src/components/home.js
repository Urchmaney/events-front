import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeTimeDisplay from './home-time-display';
import EventFeatureList from './event-feature-list';
import HomeMenu from './home-meun';
import EventList from './event-list';
import EventDescription from './event-description';
import Header from './header';
import Footer from './footer';
import '../styles/style.scss';

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
    const { isLoggedIn } = this.props;
    const { menuOn, shift } = this.state;
    const { HideMenu, showMenu } = this;
    const shiftStyle = {
      left: shift,
    };
    if (!isLoggedIn) {
      return (<Redirect to="/login" />);
    }
    return (
      <div className="container">
        <HomeMenu onClick={HideMenu} show={menuOn} />
        <div className="content-main" style={shiftStyle}>
          <EventDescription />
          <Header fontType="bars" title="Home" onClick={showMenu} notifyIcon />
          <HomeTimeDisplay days="2" hr="4" minutes="40" />
          <EventFeatureList />
        </div>


        {/* <div className="main">
        <EventList />
        <Footer />
      </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.loggedIn,
});

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Home);
