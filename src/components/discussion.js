/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './header';
import Comment from './comment';
import { get, post } from '../services/call';
import { commentUrl } from '../constants';

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: '',
    };
    this.returnHome = this.returnHome.bind(this);
    this.HandleOnChange = this.HandleOnChange.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  componentDidMount() {
    const { event, token } = this.props;
    const getResult = get(commentUrl(event.id), token);
    getResult.then((result) => {
      if (!result.error) {
        this.setState({
          comments: result,
          comment: '',
        });
      }
    });
  }

  HandleSubmit() {
    const { comment } = this.state;
    const { event, token } = this.props;
    const postResult = post(commentUrl(event.id), { content: comment }, token);
    postResult.then((result) => {
      if (!result.error) {
        this.setState({
          comments: result,
          comment: '',
        });
      }
    });
  }

  HandleOnChange(event) {
    const { value } = event.target;
    this.setState(state => ({
      ...state, comment: value,
    }));
  }

  returnHome() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { event, isLoggedIn } = this.props;
    const { comments, comment } = this.state;
    const { returnHome, HandleOnChange, HandleSubmit } = this;
    if (!isLoggedIn) {
      return (<Redirect to="/login" />);
    }
    return (
      <div className="dis">
        <Header fontType="arrow-left" title="Discussion" onClick={returnHome} />
        <div className="dis-main">
          <div className="dis-container">
            <div className="wrapper">
              <p className="title">
                {event.title}
              </p>
              <p className="time">
                {new Date(event.created_at).toString().split(' ', 5).join(' ')}
              </p>
            </div>
          </div>
        </div>
        <div className="comments-container">
          {
            comments.map(comment => (
              <Comment
                key={comment}
                name={`${comment.user.firstname} ${comment.user.lastname}`}
                comment={comment.content}
              />
            ))
          }
        </div>
        <div className="form">
          <input type="text" value={comment} placeholder="Comment" onChange={HandleOnChange} />
          <button type="button" onClick={HandleSubmit}>
            <FontAwesomeIcon icon={['fab', 'telegram-plane']} />
          </button>
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

Discussion.propTypes = {
  event: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Discussion);
