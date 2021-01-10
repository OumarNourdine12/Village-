'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Annonce extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: "user" });
    }
  };
  Annonce.init({
    nom_action: DataTypes.STRING,
    lieu: DataTypes.STRING,
    date_debut: DataTypes.DATE,
    date_fin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Annonce',
  });
  return Annonce;
};