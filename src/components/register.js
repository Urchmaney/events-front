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
    const { onSuccessRegistration, onErrorRegistration } = this;
    const postResult = post(registerUrl, this.state,
      onSuccessRegistration, onErrorRegistration);
    postResult.then((result) => {
      if (result.error) {
        onErrorRegistration(result.error);
      } else {
        onSuccessRegistration(result.token);
      }
    });
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
      <div className="auth">
        <div className="auth-image" />
        <div className="auth-form-container">
          <h3 className="auth-header">Sign Up</h3>
          <ul>
            {errors.map((error) => (<li key={error}>{error}</li>))}
          </ul>
          <div className="input-container">
            <input name="email" type="text" onChange={handleChange} required />
            <span>Email</span>
          </div>
          <div className="input-container">
            <input name="username" type="text" onChange={handleChange} required />
            <span>Username</span>
          </div>
          <div className="input-container">
            <input name="names" type="text" onChange={handleChange} required />
            <span>First and Last Name</span>
          </div>
          <div className="input-container">
            <input name="password" type="password" onChange={handleChange} required />
            <span>Password</span>
          </div>
          <div className="input-container">
            <input name="password_confirmation" type="password" onChange={handleChange} required />
            <span>confirm Password</span>
          </div>
          <button type="button" onClick={handleSubmit}> Sign Up </button>
        </div>
        <a href="/register"> Login </a>
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
