import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './organisms/Navigation/Navbar';
import Accueil from './pages/Accueil/Accueil';
import Inscription from './pages/Inscription/Inscription';
import Connexion from './pages/Connexion/Connexion';
import Profil from './pages/Profil/Profil';
import ConnexionAdmin from './pages/Admins/ConnexionAdmin';
import Don from './pages/Don/Don';
import Annonces from './pages/Annonces/Annonces';
import AnnoncesTous from './pages/Annonces/AnnoncesTous';


class Routes extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Accueil} />
          <div className="container">
            <Route exact path="/inscription" component={Inscription} />
            <Route exact path="/connexion" component={Connexion} />
            <Route exact path="/admins" component={ConnexionAdmin} />
            <Route exact path="/profil" component={Profil} />
            <Route exact path="/don" component={Don} />
            <Route exact path="/annonces" component={Annonces} />
            <Route exact path="/annoncesTous" component={AnnoncesTous} />
          </div>
        </div>
        <Navbar />
      </Router>
    )
  }
}


export default Routes

