'use strict';

const vet = require('../seeds/annonces')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Annonces", vet("Annonces"), {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Annonces', null, {});
    }
};