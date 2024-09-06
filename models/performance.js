"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Performance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Performance.belongsTo(models.PerformanceReport);
      Performance.belongsTo(models.Employee);

      Performance.hasMany(models.Score);
    }
  }
  Performance.init(
    {
      PerformanceReportId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {notNull: {msg: "PerformanceReportId is required"}},
      },
      EmployeeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {notNull: {msg: "EmployeeId is required"}},
      },
      finalScore: {
        allowNull: false,
        type: DataTypes.FLOAT,
        validate: {notNull: {msg: "finalScore is required"}},
      },
    },
    {
      sequelize,
      modelName: "Performance",
    }
  );
  return Performance;
};
