import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './home';
import Register from './register';
import Login from './login';
import EventDescription from './event-description';
import EventList from './event-list';
import Discussion from './discussion';
import Attendees from './attendees';
import CreateEvent from './create-event';
import '../fontawesome';
import '../styles/style.scss';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/events" component={EventList} />
      <Route path="/event/description" component={EventDescription} />
      <Route path="/event/discussion" component={Discussion} />
      <Route path="/event/attendees" component={Attendees} />
      <Route path="/event/create" component={CreateEvent} />
    </Switch>
  </Router>
);

export default App;
