const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('test-db','contact','pass', {
    dialect: 'sqlite',
    host: './config/database.db'
});

module.exports = sequelize;