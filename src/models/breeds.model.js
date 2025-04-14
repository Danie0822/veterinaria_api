// Modelo de datos para las razas de perros
const {DataTypes} = require('sequelize');
const BaseEntity = require('./base.entity'); // Solo si usas una clase base

class Breeds extends BaseEntity{
    static initModel(sequelize){
        super.init(
            {
                name: {
                    type: DataTypes.STRING(250),
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'Breed',
                tableName: 'Breeds'
            }
        );
    }
}
module.exports = Breeds;
