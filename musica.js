const Sequelize = require("sequelize");
const bd = require("./conexao.js");

const Musica = bd.define("musicas", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    artista: {
        type:Sequelize.STRING,
        allowNull: false
    },
    imagem: {
        type:Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type:Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Musica;