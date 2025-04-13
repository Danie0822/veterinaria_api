// src/models/area.model.js
const { DataTypes } = require('sequelize');
const BaseEntity = require('./base.entity'); // Solo si usas una clase base

class TypePets extends BaseEntity {
    static initModel(sequelize) {
        super.init(
            {
                name: {
                    type: DataTypes.STRING(250),
                    allowNull: false
                },

            },
            {
                sequelize,
                modelName: 'TypePet',
                tableName: 'TypePets'
            }
        );
    }
}

module.exports = TypePets;