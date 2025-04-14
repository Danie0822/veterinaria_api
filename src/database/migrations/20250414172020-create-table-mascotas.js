'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('Pets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Nombre de la mascota',
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Edad de la mascota',
      },
      gender: {
        type: Sequelize.ENUM('M', 'F'),
        allowNull: false,
        comment: 'Genero de la mascota',
      },
      type_pet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'TypePets',
          key: 'id'
        },
        comment: 'Tipo de mascota (Perro, Gato, etc.)',
      },
      breed_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Breeds',
          key: 'id'
        },
        comment: 'Raza de la mascota (Pitbull, Labrador, etc.)',
      },
      owner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        comment: 'ID del propietario de la mascota',
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
    })

  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('Pets');
  }
};
