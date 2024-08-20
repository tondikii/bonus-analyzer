"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Criterion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Criterion.hasMany(models.Appraisal);
    }
  }
  Criterion.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "name is required"},
          notEmpty: {msg: "name cannot be empty"},
        },
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {msg: "weight is required"},
        },
      },
    },
    {
      sequelize,
      modelName: "Criterion",
    }
  );
  return Criterion;
};
