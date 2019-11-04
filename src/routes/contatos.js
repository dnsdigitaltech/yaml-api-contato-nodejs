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

  router.get('/:id', (req, res, next) => {   
    app.services.contato.findOne({ id: req.params.id })        
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  });

  router.get('/', (req, res, next) => {     
    app.services.contato.find()
      .then(result => res.status(200).json(result))
      .catch(err => next(err));
  });

  router.put('/:id', (req, res, next) => {
    app.services.contato.update(req.params.id, req.body)
      .then(result => res.status(200).json(result[0]))
      .catch(err => next(err));
  });
  
  router.delete('/:id', (req, res, next) => {
    app.services.contato.remove(req.params.id)
      .then(() => res.status(204).send())      
      .catch(err => next(err));
  });

  return router;
};


