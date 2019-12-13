/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, addToken } from '../actions/index';
import { loginUrl } from '../constants';
import { post } from '../services/call';
import image from '../event-img.png';

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
    const payload = { auth: { ...this.state } };
    post(loginUrl, payload, this.onSuccessLogin, this.onErrorLogin);
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
      <div>
        <div>
          <img alt="" src={image} />
        </div>
        <ul>
          {errors.map((error) => (<li key={error}>{error}</li>))}
        </ul>
        <input placeholder="Your Email" name="email" type="text" onChange={handleChange} />
        <br />
        <input placeholder="Password" name="password" type="password" onChange={handleChange} />
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  addToken: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
