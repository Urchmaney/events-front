import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import EventList from './event-list';
import Header from './header';
import Footer from './footer';
import '../styles/style.css';

const Home = (props) => {
  const { isLoggedIn } = props;
  if (!isLoggedIn) {
    return (<Redirect to="/login" />);
  }
  return (
    <div className="container">
      <Header />
      <div className="main">
        <EventList />
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.loggedIn,
});

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Home);
