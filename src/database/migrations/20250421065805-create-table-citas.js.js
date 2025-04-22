'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        comment: 'ID único de la cita'
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
      appointment_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        comment: 'Fecha programada'
      },
      appointment_time: {
        type: Sequelize.TIME,
        allowNull: false,
        comment: 'Hora programada'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Descripción de la cita'
      },
      status: {
        type: Sequelize.ENUM('Pendiente', 'Confirmada', 'Cancelada', 'Realizada'),
        defaultValue: 'Pendiente',
        allowNull: false,
        comment: 'Estado actual de la cita'
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
    await queryInterface.dropTable('Appointments');
  }
};
