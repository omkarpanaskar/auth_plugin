const { Sequelize } = require('sequelize');
const config = require('./config/config.json').development
const sequelize = new Sequelize(config);

sequelize.sync({
    logging: console.log,
    force: true
}).then(() => {
        console.log("database connected successfully::\n");
    })
    .catch(err => console.log("database connection error::\n", err));

module.exports = { sequelize }