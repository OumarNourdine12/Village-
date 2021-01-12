import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './organisms/Navigation/Navbar';
import Accueil from './pages/Accueil/Accueil';
import Connexion from './pages/Connexion/Connexion';
import Inscription from './pages/Inscription/Inscription';
import Profil from './pages/Profil/Profil';


class Routes extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Accueil} />
          <Route exact path="/connexion" component={Connexion}/>
          <Route exact path="/inscription" component={Inscription}/>
          <Route exact path="/profil" component={Profil}/>
        </div>
        <Navbar />
        
      </Router>
    )
  }
}


export default Routes