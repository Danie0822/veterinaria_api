'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Treatments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        comment: 'ID único del tratamiento'
      },
      pet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Pets',
          key: 'id'
        },
        comment: 'Relación con la tabla Mascotas'
      },
      assigned_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        comment: 'Usuario que asignó el tratamiento'
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        comment: 'Fecha de inicio del tratamiento'
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: 'Fecha de fin del tratamiento'
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Detalles del tratamiento'
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
    await queryInterface.dropTable('Treatments');
  }
}
