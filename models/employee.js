"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: "name is required"},
          notEmpty: {msg: "name cannot be empty"},
        },
      },
      identityNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {msg: "identityNumber is required"},
          notEmpty: {msg: "identityNumber cannot be empty"},
        },
      },
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
