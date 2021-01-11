'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Don extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: "user" });
    }
  };
  Don.init({    
    titre: DataTypes.STRING,
    montant: DataTypes.STRING,
    date_don: DataTypes.DATE

  },
    {
      sequelize,
      modelName: 'Don',
    });
  return Don;
};