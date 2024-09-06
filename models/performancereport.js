"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PerformanceReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PerformanceReport.hasMany(models.Performance);
    }
  }
  PerformanceReport.init(
    {
      period: {
        allowNull: false,
        type: DataTypes.DATE,
        validate: {
          notNull: {msg: "period is required"},
        },
      },
    },
    {
      sequelize,
      modelName: "PerformanceReport",
    }
  );
  return PerformanceReport;
};
