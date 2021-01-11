'use strict';

const vet = require('../seeds/dons')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Dons", vet("Dons"), {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Dons', null, {});
    }
};