// const UsersController = require('../controllers/users');
// const userController = new UsersController();

// //Método jsonReturn para retornar o json gerado.
// exports.jsonReturn = function(req,res){

//     //Chamando a classe e o método get da classe userController.
//     res.json(userController.get(req,res));

//     // res.json([{
//     //     name: 'usuario teste',
//     //     email:'teste@teste.com',
//     //     passowrd: 1234,
//     //     isActive: true,
//     // }]);
// }

//Importação dos módulos e pastas.
const express = require('express');
const UsersController = require('../controllers/users');
const User = require('../models/users');

const router = express.Router();
//Passando a variável user por parâmetro, já que o construtor obriga que seja passado pela url.
const usersController = new UsersController(User);

//Listando usuários por id.
router.get('/:id', (req, res) => usersController.getById(req, res));
//Inserindo usuários.
router.post('/', (req, res) => usersController.create(req,res));
//listando usuários.
router.get('/', (req, res) => usersController.get(req, res));
//Fazendo update em usuários.
router.put('/:id', (req, res) => usersController.update(req,res));
//Deletando um usuário pelo id.
router.delete('/:id', (req, res) => usersController.remove(req, res));


module.exports = router;