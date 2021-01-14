import React, { Component } from 'react';
import { Link } from 'react-router-dom';
require('./_footer.scss');


class Footer extends Component {
  render() {
    return (
      <footer>
        <section id="section_grid">
          <a href="https://www.msa.fr/lfy/solidarite-handicap-dependance" target="imagen">
            <div id="boite-1"> </div>
          </a>
          <a href="https://parissdfamour.wordpress.com/associations-sdf-a-paris/" target="imagen">
            <div id="boite-2"></div>
          </a>
          <a href="https://solidariteetprogres.fr/projet-2017/la-france-de-demain/le-handicap-une-chance-pour-la.html" target="imagen">
            <div id="boite-3"></div>
          </a>
          <a href="http://www.aidehumanitaire.org/ferme-humanitaire-defintion-fonctionnement-et-importance/" target="imagen">
            <div id="boite-4"></div>
          </a>
          <a href="" target="imagen">
            <div id="boite-5"></div>
          </a>
          <div id="boite-6">
            <h6>Pour toute question, merci de nous contacter au 01 47 46 09 09.</h6>
            <p>© 2020 VIA, Inc. Tous les droits sont réservés
              <Link className="text-center" to="/CGU" target="link"> Conditions Générales d'Utilisation.</Link>
            </p>
          </div>
        </section>
      </footer>
    )
  }
}
export default Footer;


