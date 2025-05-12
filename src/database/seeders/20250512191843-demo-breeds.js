'use strict';
const { v4: uuidv4 } = require('uuid');

const pitbullId = uuidv4();
const siameseId = uuidv4();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Breeds', [
      {
        id: pitbullId,
        name: 'Pitbull',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: siameseId,
        name: 'Siamés',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Breeds', null, {});
  }
};

module.exports.ids = { pitbullId, siameseId };
