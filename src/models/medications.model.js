const {DataTypes} = require('sequelize');
const BaseEntity = require('./base.entity');

class Medications extends BaseEntity{
    static initModel(sequelize) {
        super.init(
            {
             name: {
                type: DataTypes.STRING(250),
                allowNull: false,
            },
            description:{
                type: DataTypes.STRING(250),
                allowNull: false,
            }
            }, 
            {
                sequelize,
                modelName: 'Medication',
                tableName: 'Medications',
            }
        );
    }
}
module.exports = Medications;