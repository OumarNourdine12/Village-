import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './components/Routes';
import Header from './components/organisms/Header/Header';
import Footer from './components/organisms/Footer/Footer';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes />
          <Header />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App

