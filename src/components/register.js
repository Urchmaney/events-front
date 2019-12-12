import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { post } from '../services/call';
import { registerUrl } from '../constants';
import { login } from '../actions/index';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      names: '',
      password: '',
      password_confirmation: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSuccessRegistration(token) {
    const { login } = this.props;
    login(token);
    console.log(this.props);
  }

  onErrorRegistration() {
    console.log('error');
    console.log('another')
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
    return (
      <div>
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
  login: (token) => dispatch(login(token)),
});

const mapStateToProps = (state) => ({
  ...state,
});

Register.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
