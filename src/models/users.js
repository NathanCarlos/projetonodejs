//Importado para ser utilizado o bcrypt.
const Util = require('util');
//Importado para ser utilizado o bcrypt.
const bcrypt = require('bcrypt');
//Importação do módulo do mongoose.
const mongoose = require('mongoose');
//O Schema é utilizado pelo mongoose para validar e mapear os dados do model. Cada Schema representa uma collection do MongoDB.
const Schema = mongoose.Schema;
//Variável para poder utilizar o bcrypt.
const hashAsync = Util.promisify(bcrypt.hash);
//Esse Schema é o tipo de dados que vamos receber e quais são os nomes deles.
const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
});
/*
No bloco acima uma nova instância de schema é definida e atribuída a constant schema, o model está definido.
*/
//Sempre que o mongoose faz uma busca no mongodb ele retorna os dados em bson, que é similar ao json só que em binário.
//Depois de receber os dados o mongoose faz o processo de serialização onde transforma os dados recebidos em bson para json.
//Nesse momento é possível intervir na serialização e customizar o resultado final.
//Método utilizando quando for feito o get.
//função transform é nativa do mongoose está sendo utilizada para remover o password do final do documento.
//Alterando o esquema do usuário para o formato apropriado json.
userSchema.set('toJSON', {
    transform: (doc, ret, options) => ({
        _id: ret._id,
        email: ret.email,
        name: ret.name,
        role: ret.role
    })
});

// //Verificando se o campo de senha foi alterado.
// if(!this.password || !this.isModified('password')) {
//     return next();
//   };

//Passando o 
userSchema.pre('save', function (next) {
    if (!this.password || !this.isModified('password')) {
        return next();
    };
    hashAsync(this.password, 10)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        })
        .catch(err => next(err));
});
//Exportando o schema para ser usado na aplicação.
module.exports = mongoose.model('user', userSchema, 'users');