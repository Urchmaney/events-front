/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import User from './user';

const Organizers = (props) => {
  const { title, people } = props;
  return (
    <div className="organizer">
      <h3 className="o-title">{title}</h3>
      <div className="o-container">
        {people.map((person) => (<User key={person} name={person.name} role={person.role} />))}
      </div>
    </div>
  );
};

Organizers.propTypes = {
  title: PropTypes.string.isRequired,
  people: PropTypes.array.isRequired,
};

export default Organizers;
