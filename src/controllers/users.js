// class UsersController {
//   //Construtor para receber o objeto user do model.
//   constructor(User) {
//     this.User = User;
//   }

//   get(req, res) {
//     //Fazendo busca no banco de dados e retornando resultados.
//     return this.User.find({})
//       .then(users => res.send(users))
//       .catch(err => res.status(400).send(err.message));
//   }
//   //Método para pesquisa por id na collection id.
//   getById(req, res) {
//     const {
//       params: {
//         id
//       }
//     } = req;

//     return this.User.find({
//       _id: id
//     })
//       .then(users => res.send(users))
//       .catch(err => res.status(400).send(err.message));
//   }
//   //Método para insert na collection id.
//   create(req, res) {
//     const newUser = new this.User(req.body);

//     return newUser.save()
//       .then(() => res.status(201).send(newUser))
//       .catch(err => res.status(412).send(err.message));
//   }
//   //Método para fazer atualização com base no id do usuário.
//   update(req, res) {
//     return this.User.findOneAndUpdate({
//       _id: req.params.id
//     }, req.body)
//       .then(() => res.sendStatus(200))
//       .catch(err => res.status(422).send(err.message));
//   }
//   //Método para deletar com base no id do usuário. 
//   remove(req, res) {
//     return this.User.deleteOne({
//       _id: req.params.id
//     })
//       .then(() => res.sendStatus(204))
//       //400 significa Bad Request e é um erro genérico, como o delete não recebe e nem valida dados não caberia utilizar o código 422.
//       .catch(err => res.status(400).send(err.message));
//   }
// }

// module.exports = UsersController;


class UsersController {
  constructor(User) {
    this.User = User;
  };
  get(req, res) {
    return this.User.find({})
      .then(users => res.send(users))
      .catch(err => res.status(400).send(err.message));
  }

  getById(req, res) {
    const { params: { id } } = req;

    return this.User.find({ _id: id })
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err.message));
  }

  create(req, res) {
    const user = new this.User(req.body);

    return user.save()
      .then(() => res.status(201).send(user))
      .catch(err => res.status(422).send(err.message));
  }
  update(req, res) {
    const body = req.body;
    return this.User.findById(req.params.id)
      .then(user => {
        user.name = body.name
        user.email = body.email
        user.role = body.role
        if (body.password) {
          user.password = body.password
        }
        return user.save();
      })
      .then(() => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message));
  }

  remove(req, res) {
    return this.User.remove({ _id: req.params.id })
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  }
}
module.exports = UsersController;