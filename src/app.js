// //Imports
// const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./routes');
// const database = require('./config/database');
// //App recebe express.
// const app = express();

// //Função que irá configurar o express e retornar uma nova instância de aplicação configurada.
// var configureExpress = () =>{
//     app.use(bodyParser.json());
//     app.use('/', routes);

//     return app;
// }
// //Exportando função que retorna uma Promise. Assim que a promise for resolvida, significa que o banco de dados está disponível, ai sim é chamada a função configureExpress que irá configurar o express e retornar uma nova instância.
// module.exports = () => database.connect().then(configureExpress);

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const database = require('../config/database');

const app = express();
const configureExpress = () => {
  app.use(bodyParser.json());
  app.use('/', routes);
  return app;
}; 
module.exports = () => database.connect()
                               .then(configureExpress);