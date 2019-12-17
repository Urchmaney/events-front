/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from '../services/call';
import { attendeeUrl } from '../constants';
import Header from './header';
import User from './user';


class Attendees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attendees: [],
    };
    this.returnHome = this.returnHome.bind(this);
  }

  componentDidMount() {
    const { event, token } = this.props;
    const getResult = get(attendeeUrl(event.id), token);
    getResult.then((result) => {
      if (!result.error) {
        this.setState({
          attendees: result,
        });
      }
    });
  }

  returnHome() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { attendees } = this.state;
    const { returnHome } = this;
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return (<Redirect to="/login" />);
    }
    return (
      <div>
        <Header fontType="arrow-left" title="Attendees" onClick={returnHome} />
        <div>
          {
            attendees.map(att => (<User key={att} name={`${att.firstname} ${att.lastname}`} />))
          }
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  event: state.event,
  token: state.token,
  isLoggedIn: state.loggedIn,
});

Attendees.propTypes = {
  event: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Attendees);
