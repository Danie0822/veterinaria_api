'use strict';
const { v4: uuidv4 } = require('uuid');

const medId = uuidv4();

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Medications', [
      {
        id: medId,
        name: 'Antiparasitario',
        description: 'Elimina parásitos intestinales',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Medications', null, {});
  }
};

module.exports.ids = { medId };
