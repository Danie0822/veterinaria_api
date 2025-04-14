const { DataTypes } = require('sequelize');
const BaseEntity = require('./base.entity'); // Solo si usas una clase base

class Pets extends BaseEntity {
    static associate(models) {
        this.belongsTo(models.Breed, {
            foreignKey: 'breed_id',
            as: 'breed'
        });
        this.belongsTo(models.User, {
            foreignKey: 'owner_id',
            as: 'owner'
        });
        this.belongsTo(models.TypePet, {
            foreignKey: 'type_pet_id',
            as: 'type'
        });
    }

    static initModel(sequelize) {
        super.init(
            {
                name: {
                    type: DataTypes.STRING(250),
                    allowNull: false,
                },
                age: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                gender: {
                    type: DataTypes.ENUM('M', 'F'),
                    allowNull: false,
                },
                type_pet_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'TypePets',
                        key: 'id'
                    },
                },
                breed_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'Breeds',
                        key: 'id'
                    },
                },
                owner_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'Users',
                        key: 'id'
                    },
                },
            },
            {
                sequelize,
                modelName: 'Pet',
                tableName: 'Pets'
            }
        );
    }
} 
module.exports = Pets;