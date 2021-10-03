const Sequelize = require("sequelize");
const bd = require("./conexao.js");

const User = bd.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type:Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;