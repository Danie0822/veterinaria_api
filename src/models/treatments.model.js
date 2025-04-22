const { DataTypes } = require('sequelize');
const BaseEntity = require('./base.entity');

class Treatments extends BaseEntity {
    static associate(models) {
        this.belongsTo(models.Pet, {
            foreignKey: 'pet_id',
            as: 'pet'
        });
        this.belongsTo(models.User, {
            foreignKey: 'assigned_by',
            as: 'assignedBy'
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
                assigned_by: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'Users',
                        key: 'id'
                    },
                },
                start_date: {
                    type: DataTypes.DATEONLY,
                    allowNull: false,
                },
                end_date: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
                },
                details: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Treatment',
                tableName: 'Treatments'
            }
        );
    }
}

module.exports = Treatments;
