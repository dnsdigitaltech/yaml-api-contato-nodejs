// todos os middlewares que for utilizar
const bodyParser = require('body-parser');
//const knexLogger = require('knex-logger');// logar consultas
const cors = require('cors');
module.exports = (app) => {
  app.use(bodyParser.json());
  // app.use(knexLogger(app.db));
  app.use(cors({ origin: '*' }));
};
