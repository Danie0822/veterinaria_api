'use strict';
const { v4: uuidv4 } = require('uuid');

const treatmentId = uuidv4();
const pet_id = require('./20250512191905-demo-pets').ids.petId;
const assigned_by = require('./20250512191658-demo-users').ids.adminId;

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Treatments', [
      {
        id: treatmentId,
        pet_id,
        assigned_by,
        start_date: '2024-01-10',
        end_date: '2024-02-10',
        details: 'Tratamiento general para parásitos',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Treatments', null, {});
  }
};

module.exports.ids = { treatmentId };
