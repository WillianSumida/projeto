(async ()=> {
    const bd = require("./conexao");
    const User = require("./user");
    const Musica = require("./musica");

    try{
        const resultado = await bd.sync();
        console.log(resultado);
    }catch(error){
        console.log(error);
    }
})();