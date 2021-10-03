const express = require("express");
const url = require("url");
var session = require("express-session");
const cookie = require("cookie-parser");

const Musica = require("./musica.js");
const User = require("./user.js");
const { default: axios } = require("axios");
const cookieParser = require("cookie-parser");

User.hasMany(Musica, {
    foreignKey: "userId",
    as: "user"
});
Musica.belongsTo(User);


var app = express();
const porta = 8000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "secretekeyorpenbamfncsogsdg12",
    saveUninitialized:true,
    cookie: { maxAge: 100*60*60*5 },
    resave: false 
}));



//Rotas
//1
app.post("/cadastro", cadastraUser);

//2
app.post("/autenticacaoUser", autenticaUser);

//3
//app.post("/buscaMusica", buscaMusica);
app.get("/buscaMusica/:nomeMusica", buscaMusica);

//4
app.post("/cadastraMusica", cadastraMusica);

//5
app.get("/listaMusica", listaMusica);

//6
app.delete("/deleteMusica", deleteMusica);

//7
app.get("/sair" , sair);





//app.put("/musica", updateMusica);
//app.delete("/musica", updateMusica);

app.listen(porta, () => {
     console.log(`rodou na porta ${porta}`);
})


function deleteMusica(req, res){
    res.sen('delete msucica')
}




//FUNCOES
//1
async function cadastraUser(req, res){
    var username = 'usernameTeste';//req.body.user
    var password = 'senhaTeste';//req.body.password

    User = await User.create({
        username: username,
        password: password
    })

    console.log("CADASTRADO USER");

}

//2
async function autenticaUser(req, res){
    var username = 'usernameTeste';//req.body.user
    var password = 'senhaTeste';//req.body.password

    const resultado = await User.findOne({
        where:{
            username: username,
            password: password
        }
    })

    if (resultado != null){
        console.log("LOGADO")
        req.session.userId = 8; //req.body.user_id
        console.log(req.session);

    }else{
        console.log("NAO LOGADO")
    }

}

//3
async function buscaMusica(req, res){
    //var nomeArtista = url.format('imagine dragons');//req.body.nomeArtista
    //var nomeMusica = url.format("its time");//req.body.nomeMusica
    var nomeMusica = url.format(req.params.nomeMusica);
    var key = '75e10c726db82abf3bc9452d48736e65';

    const url_api = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${nomeMusica}&api_key=${key}&format=json`;
    //const url_api = `http://ws.audioscrobbler.com/2.0/?method=track.search&artist=${nomeArtista}&track=${nomeMusica}&api_key=${key}&format=json`;
    console.log(url_api);
    const resposta = await axios.get(url_api).then(res => (res.data));

    console.log(resposta.results.trackmatches.track[0]);
    res.send(resposta);

}

//4
async function cadastraMusica(req, res){
    var nome = 'nomeArtista';//req.body.nome
    var artista = 'artista';//req.body.artista
    var imagem = 'imagem';//req.body.imagem
    var userId = 8;//req.body.userId

    Musica = await Musica.create({
        nome: nome,
        artista: artista,
        imagem: imagem,
        userId: userId
    })

    console.log("CADASTRADO MUSICA");

}

//5 
async function listaMusica(req, res){
    console.log(req.session.userId);
    const resultado = await Musica.findAll({
        include: ["user"],
        where:{
            userId: 8
        }
    })

    console.log(resultado);
    res.send(resultado);
}

//6 
async function deleteMusica(req, res){
    const musicaId = 4;//req.body.musicaId;

    const resultado = await Musica.findOne({
        include: ["user"],
        where:{
            id: musicaId
        }
    })

    if(resultado != null){
        await resultado.destroy();
    }else{
        console.log("nao tem");
    }

    res.send(resultado);
}

//7
function sair(req,res){
    console.log(req.session);
    req.session.destroy();
    console.log(req.session);
}