import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './home';
import Register from './register';
import Login from './login';
import '../styles/style.css';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>
);

export default App;
