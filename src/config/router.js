const express = require('express');

module.exports = (app) => {
  
  app.use('/auth', app.routes.auth);
  // api protegida dentre de um unico roteador
  const protectedRouter = express.Router();
  protectedRouter.use('/contatos', app.routes.contatos);
  app.use('/', app.config.passport.authenticate(), protectedRouter);
};
