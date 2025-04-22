const { DataTypes } = require('sequelize');
const BaseEntity = require('./base.entity');

class Appointments extends BaseEntity {
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
                appointment_date: {
                    type: DataTypes.DATEONLY,
                    allowNull: false,
                },
                appointment_time: {
                    type: DataTypes.TIME,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM('Pendiente', 'Confirmada', 'Cancelada', 'Realizada'),
                    defaultValue: 'Pendiente',
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Appointment',
                tableName: 'Appointments'
            }
        );
    }
}

module.exports = Appointments;
