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
import Discussion from './discussion';
import '../fontawesome';
import '../styles/style.scss';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/event/description" component={EventDescription} />
      <Route path="/event/discussion" component={Discussion} />
    </Switch>
  </Router>
);

export default App;
