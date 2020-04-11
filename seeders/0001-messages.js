'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'messages',
      [
        {
          data: 'Hello seeded World!',
          createdAt: '2020-04-11 13:17:36.847+00',
          updatedAt: '2020-04-11 13:17:36.847+00',
        },
      ],
      {}
    );
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('messages', null, {});
    await queryInterface.sequelize.query(
      'alter sequence messages_id_seq restart with 1;'
    );
  },
};