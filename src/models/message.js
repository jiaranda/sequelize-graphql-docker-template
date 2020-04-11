'use strict'
module.exports = (sequelize, DataTypes) => {
    const message = sequelize.define('message', {
      data: DataTypes.STRING,
    });
    return message;
  };