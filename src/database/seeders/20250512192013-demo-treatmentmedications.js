'use strict';
const { v4: uuidv4 } = require('uuid');

const medication_id = require('./20250512191925-demo-medications').ids.medId;
const treatment_id = require('./20250512191950-demo-treatments').ids.treatmentId;

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('TreatmentMedications', [
      {
        id: uuidv4(),
        treatment_id,
        medication_id,
        recommendation: 'Aplicar cada 12 horas',
        dosage: '2ml',
        quantity: 10,
        is_lifelong: false,
        end_date: '2024-02-10',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('TreatmentMedications', null, {});
  }
};
