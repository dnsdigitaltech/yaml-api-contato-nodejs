// verificar se o user está condizente com o do banco e gerar token
const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-node');
const ValidationError = require('../errors/ValidationError');

const secret = '@S3CRET2019@';

module.exports = (app) => {
  const router = express.Router();// roteador específico para autenticação

  router.post('/signin', (req, res, next) => {
    app.services.user.findOne({ mail: req.body.mail })
      .then((user) => {
        // caso não exista user
        if (!user) throw new ValidationError('Usuário ou senha inválido!');
        if (bcrypt.compareSync(req.body.passwd, user.passwd)) { // bcript comprar a senha que vem do pot como a senha do banco
          const payload = {
            id: user.id,
            name: user.name,
            mail: user.mail,
          };
          const token = jwt.encode(payload, secret);// criando o token
          res.status(200).json({ token });
        } else throw new ValidationError('Usuário ou senha inválido!');
      }).catch(err => next(err));
  });

  router.post('/signup', async (req, res, next) => {
    try {
      const result = await app.services.user.save(req.body);// alem de inserir retornar tudo que foi inserido, await torna esta requisição sincrona
      return res.status(201).json(result[0]);// retorna apenas o objeto inserido e não todos da base
    } catch (err) {
      return next(err);
    }
  });// por esta função está como await deve ter o objeto assync

  return router;
};
