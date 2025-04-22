'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicalRecords', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        comment: 'ID único del registro médico'
      },
      pet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Pets',
          key: 'id'
        },
        comment: 'Relación con la mascota'
      },
      visit_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        comment: 'Fecha de la visita'
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Motivo de la consulta'
      },
      diagnosis: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Diagnóstico establecido'
      },
      treatment: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Tratamiento aplicado'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('MedicalRecords');
  }
};
