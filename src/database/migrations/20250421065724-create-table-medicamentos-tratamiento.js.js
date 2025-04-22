'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TreatmentMedications', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        comment: 'ID único del medicamento en tratamiento'
      },
      treatment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Treatments',
          key: 'id'
        },
        comment: 'Relación con el tratamiento'
      },
      medication_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Medications',
          key: 'id'
        },
        comment: 'Relación con el medicamento'
      },
      recommendation: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Recomendación de uso'
      },
      dosage: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Dosis específica'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Cantidad asignada'
      },
      is_lifelong: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Indica si es medicación permanente'
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: 'Fecha límite para medicación temporal'
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
    await queryInterface.dropTable('TreatmentMedications');
  }
};
