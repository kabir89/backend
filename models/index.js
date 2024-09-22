const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username must not be empty",
        },
        len: {
          args: [3, 20],
          msg: "Username must be between 3 to 20 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique",
      },
      validate: {
        notEmpty: {
          msg: "Email must not be empty",
        },
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
