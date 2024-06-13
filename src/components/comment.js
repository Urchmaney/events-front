import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Comment = (props) => {
  const { name, comment } = props;
  return (

    <div className="comment-container">
      <div className="img-container">
        <FontAwesomeIcon icon="user" />
      </div>
      <div className="text-container">
        <p className="name">
          {name}
        </p>
        <p className="comment">
          {comment}
        </p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default Comment;
