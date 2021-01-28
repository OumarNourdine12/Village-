

const models = require('../models');
const jwttoken = require('../middlewares/jwt');
const { UnauthorizedError } = require('../helpers/errors');

const { User } = models;
const { Don } = models;

module.exports = {

    creerDon: async (req, res, next) => {
        var headerAuth = req.headers['authorization']
        console.log('oumar', headerAuth);
        const decoded = jwttoken.getUserId(headerAuth);
        console.log('lol', decoded);
        if (decoded < 0) {
            throw new UnauthorizedError(
                'Non autorisé',
                'Vous devez être connecté pour accéder à cette ressource.'
            );
        };
        const user = await models.User.findByPk(decoded);
        console.log('tutu', user.id)
        const donData = {
            userId: user.id,
            titre: req.body.titre,
            montant: req.body.montant,
            date_don: req.body.date_don
            //createAt: moment().add(5, 'minutes').unix() date_naissance: moment().unix(),
        }

        if (!donData) {
            res.status(400)
            res.json({
                error: 'Mauvaises données'
            })

        } else {
            await models.Don.create(donData)
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.json('Erreur : ' + err)
                })
        }
    },

    getDons: async (req, res) => {
        await models.Don.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "nom", "prenom", "email"],
                },
            ],
        })
            .then(dons => {
                res.json(dons)
            })
            .catch(err => {
                res.send('Erreur: ' + err)
            })
    },

    getDon: async (req, res, next) => {
        await models.Don.findOne({
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
            .then(don => {
                if (don) {
                    res.json(don)
                } else {
                    res.send("Le don n'existe pas")
                }
            })
            .catch(err => {
                res.send('Erreur: ' + err)
            })
    },


    donDelete: async (req, res, next) => {
        var headerAuth = req.headers['authorization']
        const decoded = jwttoken.getUserId(headerAuth);
        //console.log(decoded);
        if (decoded < 0) {
            throw new UnauthorizedError(
                'Non autorisé',
                'Vous devez être connecté pour accéder à cette ressource.'
            );
        };
        const user = await models.User.findByPk(decoded);
        console.log('tutu', user.id)
        await models.Don.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.json({ status: 'Don supprimé!' })
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    },

    donPut: async (req, res, next) => {
        {
            const { id } = req.params;
            const donData = {
                titre: req.body.titre,
                montant: req.body.montant,
                date_don: req.body.date_don
            }
            if (!donData) {
                res.status(400)
                res.json({
                    error: 'Mauvaises données'
                })
            } else
                await models.Don.update(
                    donData,
                    { where: { id } }
                )
                    .then(() => {
                        res.json({ status: 'Don mise à jour!' })
                    })
                    //.catch(err => handleError(err))
                    .catch(err => {
                        res.send('error: ' + err)
                    })
        }
    },
    /********************************************************** Nouvelle Code **************************************************************************/

    userEtDon: async (req, res) => {

        var headerAuth = req.headers['authorization']
        const decoded = jwttoken.getUserId(headerAuth);
        //console.log(decoded);
        if (decoded < 0) {
            throw new UnauthorizedError(
                'Non autorisé',
                'Vous devez être connecté pour accéder à cette ressource.'
            );
        };
        const user = await models.User.findByPk(decoded);
        await models.User.findOne({
            where: {
                id: user.id
            },
            include: [
                {
                    model: Don,
                    as: "Dons",
                    attributes: [
                        "id",
                        "titre",
                        "montant",
                        "date_don"
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