const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database')

class Contact extends Model {}

Contact.init({
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'contact',
    timestamps: false
});

module.exports = Contact