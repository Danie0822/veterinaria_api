const { DataTypes } = require('sequelize');
const BaseEntity = require('./base.entity');

class MedicalRecords extends BaseEntity {
    static associate(models) {
        this.belongsTo(models.Pet, {
            foreignKey: 'pet_id',
            as: 'pet'
        });
    }

    static initModel(sequelize) {
        super.init(
            {
                pet_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'Pets',
                        key: 'id'
                    },
                },
                visit_date: {
                    type: DataTypes.DATEONLY,
                    allowNull: false,
                },
                reason: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                diagnosis: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                treatment: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'MedicalRecord',
                tableName: 'MedicalRecords'
            }
        );
    }
}

module.exports = MedicalRecords;
