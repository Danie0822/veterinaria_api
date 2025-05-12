'use strict';
const { v4: uuidv4 } = require('uuid');

const dogTypeId = uuidv4();
const catTypeId = uuidv4();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('TypePets', [
      {
        id: dogTypeId,
        name: 'Perro',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: catTypeId,
        name: 'Gato',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('TypePets', null, {});
  }
};

module.exports.ids = { dogTypeId, catTypeId };
