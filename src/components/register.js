/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { post } from '../services/call';
import { registerUrl } from '../constants';
import { login, addToken } from '../actions/index';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      email: '',
      username: '',
      names: '',
      password: '',
      password_confirmation: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSuccessRegistration = this.onSuccessRegistration.bind(this);
    this.onErrorRegistration = this.onErrorRegistration.bind(this);
  }

  onSuccessRegistration(token) {
    const { login, addToken, history } = this.props;
    login();
    addToken(token);
    this.resetState();
    history.push('/');
  }

  onErrorRegistration(errors) {
    this.setState((state) => ({
      ...state, errors,
    }));
  }

  resetState() {
    this.setState({
      errors: [],
      email: '',
      username: '',
      names: '',
      password: '',
      password_confirmation: '',
    });
  }

  handleSubmit() {
    post(registerUrl, this.state, this.onSuccessRegistration, this.onErrorRegistration);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((state) => ({
      ...state, [name]: value,
    }));
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { errors } = this.state;
    return (
      <div>
        <ul>
          {errors.map((error) => (<li key={error}>{error}</li>))}
        </ul>
        <input placeholder="Your Email" name="email" type="text" onChange={handleChange} />
        <br />
        <input placeholder="Username" name="username" type="text" onChange={handleChange} />
        <br />
        <input placeholder="First and Last Name" name="names" type="text" onChange={handleChange} />
        <br />
        <input placeholder="Password" name="password" type="password" onChange={handleChange} />
        <br />
        <input placeholder="confirm Password" name="password_confirmation" type="password" onChange={handleChange} />
        <br />
        <button type="button" onClick={handleSubmit}> Submit </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  addToken: (token) => dispatch(addToken(token)),
});

const mapStateToProps = (state) => ({
  ...state,
});

Register.propTypes = {
  login: PropTypes.func.isRequired,
  addToken: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
