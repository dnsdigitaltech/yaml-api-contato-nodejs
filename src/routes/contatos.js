const express = require('express');
const RecursoIndevidoError = require('../errors/RecursoIndevidoError');

module.exports = (app) => {
  const router = express.Router();
  router.post('/', (req, res, next) => {
    app.services.contato.save({ ...req.body})
      .then((result) => {
        if (result.error) return res.status(400).json(result);
        console.log(result.error);
        return res.status(201).json('Contato cadastrado com sucesso!');
      }).catch(err => next(err));// middlware err
  });

  return router;
};
