import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

require('./_navbar.scss')

class Navbar extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('token')
    this.props.history.push(`/`)
  }
// avant de se coonecter
  render() {
    const loginRegLink = (
      <nav className="navigation">

        <img className="logo-a" src="./img/logoVIA.jpg" alt="logo" />
        <div className="navigation__button media_smartphone">
          <Link to="/">
            <img className="logo-nav" src="./img/home.jpg" alt="logo" />
            <h3>Accueil</h3>
          </Link>
        </div>
        <div className="navigation__button media_smartphone">
          <Link to="/connexion">
            <img className="logo-nav" src="./img/connexion.jpg" alt="logo8" />
            <h3>Connexion</h3>
          </Link>
        </div>
        <div className="navigation__button media_smartphone">
          <Link to="/inscription">
            <img className="logo-nav" src="./img/inscription.jpg" alt="logo7" />
            <h3>Inscription</h3>
          </Link>
        </div>
        <div className="navigation__button media_smartphone">
          <Link to="/admins">
            <img className="logo-nav" src="./img/nous.jpg" alt="logo4" />
            <h3>Admins</h3>
          </Link>
        </div>
      </nav>
    )

    // apres connexion

    const userLink = (
      <nav className="navigation">
        <img className="logo-b" src="./img/logoVIA.jpg" alt="logo" />
        <div className="navigation__button media_smartphone">
          <Link to="/" >
            <img className="logo-nav" src="./img/home.jpg" alt="logo1" />
            <h3>Accueil</h3>
          </Link>
        </div>
        <div className="navigation__button media_smartphone">
          <Link to="/profil" >
            <img className="logo-nav" src="./img/profil.jpg" alt="logo2" />
            <h3>Profil</h3>
          </Link>
        </div>
        <div className="navigation__button media_smartphone">
          <Link to="/don">
            <img className="logo-nav" src="./img/don.jpg" alt="logo4" />
            <h3>Don</h3>
          </Link>
        </div>
        <div className="navigation__button media_smartphone">
          <Link to="/annonces" >
            <img className="logo-nav" src="./img/annonce.jpg" alt="logo3" />
            <h3>Annonces</h3>
          </Link>
        </div>

        <div className="navigation__button media_smartphone">
          <a href="deconnexion" onClick={this.logOut.bind(this)}>
            <img className="logo-nav" src="./img/deconnecter.jpg" alt="logo5" />
            <h3>Déconnexion</h3>
          </a>
        </div>


      </nav>
    )

    return (
      <nav className="navigation">
        {localStorage.token ? userLink : loginRegLink}
      </nav>
    )
  }
}

export default withRouter(Navbar)