"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appraisal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appraisal.belongsTo(models.Criterion, {
        foreignKey: {
          name: "CriterionId",
        },
      });
    }
  }
  Appraisal.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      CriterionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {msg: "CriterionId is required"},
        },
      },
    },
    {
      sequelize,
      modelName: "Appraisal",
    }
  );
  return Appraisal;
};
