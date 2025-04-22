const { DataTypes } = require('sequelize');
const BaseEntity = require('./base.entity');

class TreatmentMedications extends BaseEntity {
    static associate(models) {
        this.belongsTo(models.Treatment, {
            foreignKey: 'treatment_id',
            as: 'treatment'
        });
        this.belongsTo(models.Medication, {
            foreignKey: 'medication_id',
            as: 'medication'
        });
    }

    static initModel(sequelize) {
        super.init(
            {
                treatment_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'Treatments',
                        key: 'id'
                    },
                },
                medication_id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    references: {
                        model: 'Medications',
                        key: 'id'
                    },
                },
                recommendation: {
                    type: DataTypes.TEXT,
                    allowNull: false,
                },
                dosage: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                is_lifelong: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false,
                },
                end_date: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
                },
            },
            {
                sequelize,
                modelName: 'TreatmentMedication',
                tableName: 'TreatmentMedications'
            }
        );
    }
}

module.exports = TreatmentMedications;
