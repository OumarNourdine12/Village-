import React, { Component } from 'react';




require('./_accueil.scss');

class Accueil extends Component {
    render() {
        return (

            <section>
                <div className="div-center">
                    <img className="logo" src="./img/logoVIA.jpg" alt="logovia" /><br />
                    <h1 className="titre">Village D'Ici et D'Ailleurs</h1>
                    <h1 className="titre">BIENVENUE</h1>
                    <img className="image" src="./img/personne.jpeg" alt="image" />
                    <iframe className="image-video" src="https://www.youtube.com/embed/DYoUa7hhC_I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <p className="text">L’inclusion des personnes handicapées dans l’action humanitaire</p>
                    <p className="text">Ne laisser personne de côté</p>

                </div>
            </section >
        )
    }
}

export default Accueil