const app = require('express')();// framworks
const consign = require('consign');// gerenciado de meddwares
const knex = require('knex');// nex migrations
const winston = require('winston');
const uuid = require('uuid/v4');
const knexfile = require('../knexfile');// conexao


// inicializar o db
// TODO criar chaveamento dinâmico
app.db = knex(knexfile[process.env.NODE_ENV]);// passa o knexfile e referenciar ambiente test

app.log = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({ format: winston.format.json({ space: 1 })}),
    new winston.transports.File({
      filename: 'logs/erros.log',
      level: 'warn',
      format: winston.format.combine(winston.format.timestamp(),
      winston.format.json({ space: 1 })),
    }),
  ],
});


consign({ cwd: 'src', verbose: false })// diretótio padrão 
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(app);


// middleware para envios e tratamento de errors
app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  // tratamento de error
  if (name === 'ValidationError') res.status(400).json({ error: message });
  else if (name === 'RecursoIndevidoError') res.status(403).json({ error: message });
  else {
    const id = uuid();
    // console.log(message);
    app.log.error({ id, name, message, stack });
    res.status(500).json({ id, error: 'Falha interna' }); // stack campinho que o erro passou
  }
  next(err);
});

// 404
app.use((req, res) => {
  res.status(404).send('Não conheço essa requisição');
});

// manual ao nvez de usar o Logger
/* app.db.on('query', query => {
    console.log({sql: query.sql, bindings: query.bindings ? query.bindings.join(',') : ''});
}).on('query-response', response => {
    console.log(response);
}).on('error', error => console.log(error)); */

module.exports = app;
