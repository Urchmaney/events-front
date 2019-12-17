/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomeMenu = (props) => {
  const {
    show, history, onClick, logout, isAdmin
  } = props;
  const style = { display: show ? 'block' : 'none' };
  return (
    <div className="menu-container" style={style}>
      <p className="menu-row">
        <span onClick={onClick} onKeyDown={onClick} role="button" tabIndex={0}>
          <FontAwesomeIcon icon="times" />
        </span>
      </p>
      <p className="menu-row" onClick={() => { history.push('/'); }} onKeyDown={() => {}} role="presentation">
        <span><FontAwesomeIcon icon="home" /></span>
      Home
      </p>
      <p className="menu-row">
        <span><FontAwesomeIcon icon="calendar-alt" /></span>
      Agenda
      </p>
      <p className="menu-row" onClick={() => { history.push('/event/description'); }} onKeyDown={() => {}} role="presentation">
        <span><FontAwesomeIcon icon="calendar-alt" /></span>
      Description
      </p>
      <p className="menu-row" onClick={() => { history.push('/event/attendees'); }} onKeyDown={() => {}} role="presentation">
        <span><FontAwesomeIcon icon="users" /></span>
      Attendees
      </p>
      <p className="menu-row" onClick={() => { history.push('/event/discussion'); }} onKeyDown={() => {}} role="presentation">
        <span><FontAwesomeIcon icon="users" /></span>
      Discussions
      </p>
      <p className="menu-row" onClick={() => { history.push('/events'); }} onKeyDown={() => {}} role="presentation">
        <span><FontAwesomeIcon icon="calendar-check" /></span>
       Events
      </p>
      {
        isAdmin && (
        <p className="menu-row" onClick={() => { history.push('/event/create'); }} onKeyDown={() => {}} role="presentation">
          <span><FontAwesomeIcon icon="calendar-check" /></span>
       Create Events
        </p>
        )
      }
      <p className="menu-row" onClick={logout} onKeyDown={() => {}} role="presentation">
        <span><FontAwesomeIcon icon="calendar-check" /></span>
       Log Out
      </p>
    </div>
  );
};

HomeMenu.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default HomeMenu;
