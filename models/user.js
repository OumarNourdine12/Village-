'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      //this.belongsTo(models.Admin, { as: "admin" });
      this.hasMany(
        models.Annonce, {
        foreignKey: "userId",
      }
      );
      this.hasMany(
        models.Don, {
        foreignKey: "userId",
      }
      );
    }
  };
  User.init({
    prenom: DataTypes.STRING,
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    adresse: DataTypes.STRING,
    code_postal: DataTypes.STRING,
    ville: DataTypes.STRING,
    pays: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
