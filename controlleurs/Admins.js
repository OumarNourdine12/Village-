const express = require('express')
const users = express.Router()
const cors = require('cors')
const bcrypt = require('bcrypt')
const models = require('../models')
const jwttoken = require('../middlewares/jwt');
const { OK } = require('../helpers/status_codes');
const { BadRequestError, UnauthorizedError, ForbiddenError } = require('../helpers/errors');

const { Don } = models;
const { Annonce } = models;
users.use(cors())

process.env.SECRET_KEY = 'secret'

module.exports = {

    connexion: async (req, res) => {
        const { email, password } = req.body;
        if (email == null || password == null) {
            throw new BadRequestError(
                "Mauvaise Requête",
                "Les champs e-mail et/ou mot de passes sont manquants, veuillez recommencer."
            );
        }
        const token = await models.Admin.findOne({
            where: { email: email },
        });
        if (!token) {
            throw new BadRequestError(
                "Mauvaise Requête",
                "Cet utilisateur n'existe pas, vérifiez votre email"
            );
        }
        const pass = await bcrypt.compare(password, token.password);
        if (!pass) {
            throw new ForbiddenError(
                "Accès refusé",
                "Le mot de passe est incorrect, vérifiez votre mot de passe."
            );
        }
        return res.status(OK).json({
            admin: {
                id: token.id,
                email: token.email,
            },
            token: jwttoken.generateTokenForUser(token),
        });
    },
    profil: async (req, res) => {
        var headerAuth = req.headers['authorization']
        const decoded = jwttoken.getUserId(headerAuth);
        console.log(decoded);
        if (decoded < 0) {
            throw new UnauthorizedError(
                'Non autorisé',
                'Vous devez être connecté pour accéder à cette ressource.'
            );
        };
        const admin = await models.Admin.findByPk(decoded);
        await models.Admin.findOne({
            where: {
                id: admin.id
            },
        })
            .then(admin => {
                if (admin) {
                    res.json(admin)
                } else {
                    res.send("L'utilisateur n'existe pas")
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }
}


