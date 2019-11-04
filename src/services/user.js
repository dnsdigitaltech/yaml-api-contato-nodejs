const bcrypt = require('bcrypt-node');
const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {
  const findAll = () => { // se manda objeto acessar o where
    return app.db('users').select(['id', 'name', 'mail']);
  };

  const findOne = (filter = {}) => { // se manda objeto acessar o where
    console.log(filter);
    return app.db('users').where(filter).first();
  };

  const getPasswdHash = (passwd) => {
    const salt = bcrypt.genSaltSync(10);// estrutura salt do proprio bcrypt para criar sequencia de caracteres aleatórios para senha
    return bcrypt.hashSync(passwd, salt);
  };

  const save = async (user) => {
    // tratamento de dados
    if (!user.name) throw new ValidationError('Nome é um atributo obrigatório');
    if (!user.mail) throw new ValidationError('Email é um atributo obrigatório');
    if (!user.passwd) throw new ValidationError('Senha é um atributo obrigatório');
    // acessar a base para ver se existe
    const userDb = await findOne({ mail: user.mail });
    // verifica se email esta cadastrado
    if (userDb) throw new ValidationError('Já existe um usuário com esse email');

    const newUser = { ...user };
    newUser.passwd = getPasswdHash(user.passwd);

    return app.db('users').insert(newUser, ['id', 'name', 'mail']);
  };

  return { findAll, findOne, save };
};
