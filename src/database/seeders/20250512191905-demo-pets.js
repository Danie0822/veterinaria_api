'use strict';
const { v4: uuidv4 } = require('uuid');

// Importamos las IDs desde otros seeders si usas archivos comunes, o defínelas aquí:
const petId = uuidv4();
const type_pet_id = require('./20250512191813-demo-typepets').ids.dogTypeId;
const breed_id = require('./20250512191843-demo-breeds').ids.pitbullId;
const owner_id = require('./20250512191658-demo-users').ids.userId;

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Pets', [
      {
        id: petId,
        name: 'Firulais',
        age: 4,
        gender: 'M',
        type_pet_id,
        breed_id,
        owner_id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Pets', null, {});
  }
};

module.exports.ids = { petId };
