const bcrypt = require("bcryptjs");

async function buildPasswordHash(instance) {
  if (instance.changed("password")) {
    const salt = await bcrypt.genSalt(Number(process.env.PASSWORD_SALT));
    const hash = await bcrypt.hash(instance.password, salt);
    instance.set("password", hash);
  }
}

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  });

  user.beforeUpdate(buildPasswordHash);
  user.beforeCreate(buildPasswordHash);

  user.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  // user.associate = (models) => {
  //   user.belongsTo(models.institution);
  //   user.belongsTo(models.role);
  // };

  return user;
};
