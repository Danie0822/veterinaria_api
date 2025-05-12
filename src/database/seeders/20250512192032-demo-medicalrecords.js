'use strict';
const { v4: uuidv4 } = require('uuid');

const pet_id = require('./20250512191905-demo-pets').ids.petId;

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('MedicalRecords', [
      {
        id: uuidv4(),
        pet_id,
        visit_date: '2024-01-10',
        reason: 'Revisión anual',
        diagnosis: 'Buena salud',
        treatment: 'Ninguno',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('MedicalRecords', null, {});
  }
};
