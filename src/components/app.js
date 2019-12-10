import React from 'react';
import EventList from './event-list';
import Header from './header';
import Footer from './footer';
import '../styles/style.css';

const App = () => (
  <div className="container">
    <Header />
    <div className="main">
      <EventList />
      <Footer />
    </div>
  </div>
);

export default App;
