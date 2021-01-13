import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/organisms/Footer/Footer';

import Routes from './components/Routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes />
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App