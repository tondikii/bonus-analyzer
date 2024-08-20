"use strict";
const {Model} = require("sequelize");
const {hashPassword} = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "name is required"},
          notEmpty: {msg: "name cannot be empty"},
        },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "email is required"},
          notEmpty: {msg: "email cannot be empty"},
          isEmail: {msg: "invalid email format"},
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {msg: "password is required"},
          notEmpty: {msg: "password cannot be empty"},
          minLength(value) {
            if (value.length < 6) {
              throw new Error(
                "password should be more than equal 6 characters"
              );
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = hashPassword(instance.password);
        },
      },
    }
  );
  return User;
};
