/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './header';
import { post } from '../services/call';
import { myEventUrl } from '../constants';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: '',
      errors: [],
      title: '',
      description: '',
      start: '',
      end: '',
      location: '',
      organizers: [],
      tempOrganizer: {
        name: '',
        role: '',
        occupation: '',
      },
    };
    this.returnHome = this.returnHome.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOrganizerChange = this.handleOrganizerChange.bind(this);
    this.addOrganizer = this.addOrganizer.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((state) => ({
      ...state, [name]: value,
    }));
  }

  handleOrganizerChange(event) {
    const { name, value } = event.target;
    this.setState((state) => ({
      ...state,
      tempOrganizer: { ...state.tempOrganizer, [name]: value },
    }));
  }

  addOrganizer() {
    this.setState((state) => {
      const organizers = [...state.organizers, state.tempOrganizer];
      const tempOrganizer = {
        name: '',
        role: '',
        occupation: '',
      };
      return {
        ...state, organizers, tempOrganizer,
      };
    });
  }

  returnHome() {
    const { history } = this.props;
    history.push('/');
  }

  submitForm() {
    const { token } = this.props;
    const { resetState } = this;
    const { organizers } = this.state;
    const payload = { ...this.state, organizers_attributes: organizers };
    ['tempOrganizer', 'organizers', 'result', 'success', 'error'].forEach((e) => delete payload[e]);
    delete payload.tempOrganizer;
    delete payload.result;
    const postResult = post(myEventUrl, { event: payload }, token);
    postResult.then((result) => {
      if (!result.error) {
        resetState();
        this.setState((state) => ({
          ...state, result: 'Successfully added event',
        }));
        setTimeout(() => resetState(), 3000);
      } else {
        this.setState((state) => ({
          ...state, errors: result.error,
        }));
      }
    });
  }

  resetState() {
    this.setState({
      result: '',
      title: '',
      description: '',
      start: '',
      end: '',
      location: '',
      organizers: [],
      tempOrganizer: {
        name: '',
        role: '',
        occupation: '',
      },
    });
  }

  render() {
    const {
      returnHome, handleChange, handleOrganizerChange, addOrganizer, submitForm,
    } = this;
    const {
      success,
      errors,
      organizers,
      title,
      location,
      start,
      end,
      description,
      tempOrganizer: { name, role, occupation },
    } = this.state;
    const { isLoggedIn } = this.props;
    const orgDiv = (name, role, occupation, key) => (
      <div key={key} className="organizer-unit">
        <p>
          <span>Name  :</span>
          {name}
        </p>
        <p>
          <span>Role :</span>
          {role}
        </p>
        <p>
          <span>Occupation :</span>
          {occupation}
        </p>
      </div>
    );
    if (!isLoggedIn) {
      return (<Redirect to="/login" />);
    }
    return (
      <div>
        <Header fontType="arrow-left" title="Create Event" onClick={returnHome} />
        <div className="create-event">

          <div>
            {success}
          </div>
          <div>
            {
            errors.map((e) => (<p key={e}>{e}</p>))
          }
          </div>
          <form>
            <div className="input-container">
              <input name="title" value={title} type="text" onChange={handleChange} required />
              <span>Title</span>
            </div>
            <div className="input-container">
              <input name="location" value={location} type="text" onChange={handleChange} required />
              <span>location</span>
            </div>
            <div className="input-container">
              <textArea name="description" placeHolder="Description" value={description} type="text" onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label htmlFor="start">start</label>
              <input name="start" id="start" type="date" value={start} onChange={handleChange} required />
            </div>
            <div className="input-container">
              <label>end</label>
              <input name="end" type="date" value={end} onChange={handleChange} required />
            </div>
            <div className="organizers-form">
              <p className="organizer-title">
                Organizers
              </p>
              {
              organizers.map((org) => (
                orgDiv(org.name, org.role, org.occupation)
              ))
            }
            </div>
            <div className="organizer-form-container">
              <div className="input-container">
                <input name="name" value={name} type="text" onChange={handleOrganizerChange} required />
                <span>name</span>
              </div>
              <div className="input-container">
                <input name="role" value={role} type="text" onChange={handleOrganizerChange} required />
                <span>role</span>
              </div>
              <div className="input-container">
                <input name="occupation" value={occupation} type="text" onChange={handleOrganizerChange} required />
                <span>occupation</span>
              </div>
              <button type="button" className="addButton" onClick={addOrganizer}>
                <FontAwesomeIcon icon="plus" />
              </button>
            </div>
            <div className="submitButton">
              <button type="button" onClick={submitForm}> Submit </button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  isLoggedIn: state.loggedIn,
});

CreateEvent.propTypes = {
  history: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(CreateEvent);
