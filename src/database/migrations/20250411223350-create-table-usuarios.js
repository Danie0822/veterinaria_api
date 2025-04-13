'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      full_name: {
        type: Sequelize.STRING(250),
        allowNull: false,
        comment: 'Nombre completo del usuario'
      },
      email: {
        type: Sequelize.STRING(250),
        unique: true,
        allowNull: false,
        unique: true,
        comment: 'Correo electrónico del usuario'
      },
      rol:{
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false, 
        defaultValue: 'user',
        validate: {
          isIn: [['admin', 'user']]
        },
        comment: 'Rol del usuario (admin o user)'
      },
      cellphone: {
        type: Sequelize.STRING(20),
        allowNull: false, 
        comment: 'Número de celular del usuario'
      },
      password: {
        type: Sequelize.STRING(250),
        allowNull: false, 
        comment: 'Contraseña del usuario'
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

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('Users');
  }
};