const models = require('../models');
const jwttoken = require('../middlewares/jwt');
const { UnauthorizedError } = require('../helpers/errors');

const { User } = models;
const { Annonce } = models;
const { Don } = models;

module.exports = {

    creerAnnonce: async (req, res, next) => {
        var headerAuth = req.headers['authorization']
        console.log("-----------------------------------------------------------------------------------------------POST ANNONCE")
        console.log("-----------------------------------------------------------------------------------------------POST ANNONCE")
        console.log("-----------------------------------------------------------------------------------------------POST ANNONCE")
        console.log("-----------------------------------------------------------------------------------------------POST ANNONCE")
        console.log("-----------------------------------------------------------------------------------------------POST ANNONCE")
        console.log("-----------------------------------------------------------------------------------------------POST ANNONCE")
        const decoded = jwttoken.getUserId(headerAuth);

        if (decoded < 0) {
            throw new UnauthorizedError(
                'Non autorisé',
                'Vous devez être connecté pour accéder à cette ressource.'
            );
        };
        const user = await models.User.findByPk(decoded);
        //console.log('tutu', user.id)
        const annonceData = {
            userId: user.id,
            nom_action: req.body.nom_action,
            lieu: req.body.lieu,
            date_debut: req.body.date_debut,
            date_fin: req.body.date_fin
        }

        if (!annonceData) {
            res.status(400)
            res.json({
                error: 'Mauvaises données'
            })

        } else {
            await models.Annonce.create(annonceData)
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.json('Erreur : ' + err)
                })
        }
    },

    getAnnonces: async (req, res) => {
        await models.Annonce.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "nom", "prenom", "email", "createdAt"],
                },
            ],
        })
            .then(annonces => {
                res.json(annonces)
            })
            .catch(err => {
                res.send('Erreur: ' + err)
            })
    },

    getAnnonce: async (req, res, next) => {
        await models.Annonce.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "nom", "prenom", "email"],
                },
            ],
        })
            .then(annonce => {
                if (annonce) {
                    res.json(annonce)
                } else {
                    res.send("Le annonce n'existe pas")
                }
            })
            .catch(err => {
                res.send('Erreur: ' + err)
            })
    },


    deleteAnnonce: async (req, res, next) => {
        var headerAuth = req.headers['authorization']
        const decoded = jwttoken.getUserId(headerAuth);
        console.log("------------------------------------------------------------------------------------------------------------------------JE DELETE ANNONCE");
        if (decoded < 0) {
            throw new UnauthorizedError(
                'Non autorisé',
                'Vous devez être connecté pour accéder à cette ressource.'
            );
        };
        // const user = await models.User.findByPk(decoded);
        // console.log('tutu', user.id)
        let test = await models.Annonce.destroy({
            where: {
                id: req.params.id
            }
        })
        console.log("///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////")
        console.log(test)
        res.json({ status: 'Annonce supprimé!' })
        // .then(() => {
        //         res.json({ status: 'Annonce supprimé!' })
        //     })
        //     .catch(err => {
        //         res.send('error: ' + err)
        //     })
    },

    putAnnonce: async (req, res, next) => {
        {
            const { id } = req.params;
            const annonceData = {
                nom_action: req.body.nom_action,
                lieu: req.body.lieu,
                date_debut: req.body.date_debut,
                date_fin: req.body.date_fin
            }
            if (!annonceData) {
                res.status(400)
                res.json({
                    error: 'Mauvaises données'
                })
            } else
                await models.Annonce.update(
                    annonceData,
                    { where: { id } }
                )
                    .then(() => {
                        res.json({ status: 'Annonce mise à jour!' })
                    })
                    //.catch(err => handleError(err))
                    .catch(err => {
                        res.send('error: ' + err)
                    })
        }
    },
    /********************************************************** Nouvelle Code **************************************************************************/

    userEtAnnonce: async (req, res) => {

        var headerAuth = req.headers['authorization']
        const decoded = jwttoken.getUserId(headerAuth);
        console.log('coroto', decoded);
        if (decoded < 0) {
            throw new UnauthorizedError(
                'Non autorisé',
                'Vous devez être connecté pour accéder à cette ressource.'
            );
        };
        const user = await models.User.findByPk(decoded);
        console.log('firulais', user);
        await models.User.findOne({
            where: {
                id: user.id
            },
            include: [
                {
                    model: Annonce,
                    as: "Annonces",
                    attributes: [
                        "id",
                        "nom_action",
                        "lieu",
                        "date_debut",
                        "date_fin"
                    ],
                },
            ],

        })
            .then(user => {
                if (user) {
                    res.json(user)
                } else {
                    res.send("L'utilisateur n'existe pas")
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    }
}