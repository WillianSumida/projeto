const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "pw4",
    "sa",
    "root",
    {
        dialect: "mysql",
        host: "localhost",

    });

    module.exports = sequelize;

