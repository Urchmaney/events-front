/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, addToken } from '../actions/index';
import { loginUrl } from '../constants';
import { post } from '../services/call';
import '../styles/style.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSuccessLogin = this.onSuccessLogin.bind(this);
    this.onErrorLogin = this.onErrorLogin.bind(this);
  }

  onSuccessLogin(token) {
    const { login, addToken, history } = this.props;
    login();
    addToken(token);
    this.resetState();
    history.push('/');
  }

  onErrorLogin(errors) {
    this.setState((state) => ({
      ...state, errors: [errors],
    }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((state) => ({
      ...state, [name]: value,
    }));
  }

  handleSubmit() {
    const { onSuccessLogin, onErrorLogin } = this;
    const payload = { auth: { ...this.state } };
    const postResult = post(loginUrl, payload);
    postResult.then((result) => {
      if (result.error) {
        onErrorLogin(result.error);
      } else {
        onSuccessLogin(result.token);
      }
    });
  }

  resetState() {
    this.setState({
      errors: [],
      email: '',
      password: '',
    });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { errors } = this.state;
    return (
      <div className="auth">
        <div className="auth-image" />
        <div className="auth-form-container">
          <h3 className="auth-header">Sign in</h3>
          <ul>
            {errors.map((error) => (<li key={error}>{error}</li>))}
          </ul>
          <div className="input-container">
            <input name="email" type="text" onChange={handleChange} required />
            <span>Email</span>
          </div>
          <div className="input-container">
            <input name="password" type="password" onChange={handleChange} required />
            <span>Password</span>
          </div>
          <button type="button" onClick={handleSubmit}> Sign In </button>
        </div>
        <a href="/register"> Register</a>
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  addToken: (token) => dispatch(addToken(token)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  addToken: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
