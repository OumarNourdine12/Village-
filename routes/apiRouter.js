const express = require('express');
require('express-async-errors');
const User = require('../controlleurs/Users');
const Don = require('../controlleurs/Dons');
const Annonce = require('../controlleurs/Annonces');

exports.router = (function () {
  const apiRouter = express.Router();


  //, jwtoken.parseAuthorization
  //--------------------------Routes User------------------------

  apiRouter.route('/inscription').post(User.inscription);
  apiRouter.route('/connexion').post(User.connexion);
  apiRouter.route('/profil').get(User.profil);

  //--------------------------Routes Dons------------------------
  apiRouter.route('/don').post(Don.creerDon);
  apiRouter.route('/dons').get(Don.getDons);
  apiRouter.route('/don/:id').get(Don.getDon);
  apiRouter.route('/don/:id').put(Don.donPut);
  apiRouter.route('/don/:id').delete(Don.donDelete);

  apiRouter.route('/donUser').get(Don.userEtDon);

  //--------------------------Routes Annonces------------------------
  apiRouter.route('/annonce').post(Annonce.creerAnnonce);
  apiRouter.route('/annonces').get(Annonce.getAnnonces);
  apiRouter.route('/annonce/:id').get(Annonce.getAnnonce);
  apiRouter.route('/annonce/:id').put(Annonce.putAnnonce);
  apiRouter.route('/annonce/:id').delete(Annonce.deleteAnnonce);

  apiRouter.route('/annonceUser').get(Annonce.userEtAnnonce);

  return apiRouter;
})();