import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/style.scss';

const Header = (props) => {
  const { fontType, title, notifyIcon, onClick } = props;
  console.log(onClick);
  return (
    <div className="header">
      <span className="icon-span-head" onClick={onClick} role="button" onKeyUp={onClick} tabIndex={0}>
        <FontAwesomeIcon icon={fontType} />
      </span>
      {title}
      <span className="icon-span">
        {notifyIcon && <FontAwesomeIcon icon="bell" />}
      </span>
    </div>
  );
};

Header.propTypes = {
  fontType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  notifyIcon: PropTypes.bool,
};

Header.defaultProps = {
  notifyIcon: false,
};

export default Header;
