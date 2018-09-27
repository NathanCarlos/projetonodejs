//Importando módulo config.
const config = require('config');
//Importando mongoose para o projeto.
const mongoose = require('mongoose');
//Especifícando qual biblioteca de promises será utilizada.
mongoose.Promise = require('bluebird');
//Especifícando qual a porta será utilizada.(Operador ternário)(Node).
process.env.PORT = process.env.PORT || 27017;
//Armazenando a url do banco de dados na variável url.
//test é o nome do banco de dados.
const uri = config.get('database.mongoUrl');
//Função que retorna a conexão com o banco de dados.
const connect = () => mongoose.connect(uri,{ useNewUrlParser: true });

//Exportando módulo de conexão com o banco de dados.
module.exports = {
    connect
}