'use strict';
const { v4: uuidv4 } = require('uuid');

const pet_id = require('./20250512191905-demo-pets').ids.petId;

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Appointments', [
      {
        id: uuidv4(),
        pet_id,
        appointment_date: '2024-01-15',
        appointment_time: '10:00:00',
        description: 'Consulta general',
        status: 'Pendiente',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Appointments', null, {});
  }
};
