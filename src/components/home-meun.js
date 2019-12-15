import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomeMenu = (props) => {
  const { show, onClick } = props;
  const style = { display: show ? 'block' : 'none' };
  return (
    <div className="menu-container" style={style}>
      <p className="menu-row">
        <span onClick={onClick} onKeyDown={onClick} role="button" tabIndex={0}>
          <FontAwesomeIcon icon="times" />
        </span>
      </p>
      <p className="menu-row">
        <span><FontAwesomeIcon icon="home" /></span>
      Home
      </p>
      <p className="menu-row">
        <span><FontAwesomeIcon icon="calendar-alt" /></span>
      Agenda
      </p>
      <p className="menu-row">
        <span><FontAwesomeIcon icon="users" /></span>
      Attendees
      </p>
      <p className="menu-row">
        <span><FontAwesomeIcon icon="calendar-check" /></span>
      All Events
      </p>
    </div>
  );
};

HomeMenu.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default HomeMenu;
