const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(Number(process.env.PASSWORD_SALT));

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "super",
          lastName: "admin",
          email: "super.admin@replace.com",
          password: bcrypt.hashSync(process.env.USER_DEFAULT_PASSWORD, salt),
          createdAt: "2020-10-04 13:17:36.847+00",
          updatedAt: "2020-10-04 13:17:36.847+00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.sequelize.query(
      "alter sequence users_id_seq restart with 1;"
    );
  },
};
