// //   Classe usada para separar os tipos de requisições e assim realizar as devidas chamadas.
// let users = require('./users');

// module.exports = (app)=>{
//     //Quando a url localhost:3000/users for chamada ele enviará o caminho ./users e utilizará o método jsonReturn.    
//     app.get('/users',users.jsonReturn);

//     app.get('/',function(req,res){
//         res.send('Hellow World');
//     });

    
// }

const express = require('express');
//Criando a rota.
const usersRoute = require('./users');
//Utilizando o método de toda do express.
const router = express.Router();
//Enviando a rota quando chama /users.
router.use('/users', usersRoute);
router.get('/', (req, res) => res.send('Hello World!'));

module.exports = router;

