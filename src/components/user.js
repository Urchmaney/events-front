import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const User = (props) => {
  const { name, role } = props;
  return (
    <div className="user">
      <div className="img-container">
        <FontAwesomeIcon icon="home" />
      </div>
      <div className="text-container">
        <p className="name">
          {name}
        </p>
        <p className="role">
          {role}
        </p>
      </div>
    </div>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
};

User.defaultProps = {
  role: '',
};

export default User;
