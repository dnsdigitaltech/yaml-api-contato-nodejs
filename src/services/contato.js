const ValidationError = require('../errors/ValidationError');

module.exports = (app) => {

  const save = async (contato) => {
    if (!contato.nome	) throw new ValidationError('Informe o nome para o contato');
    if (!contato.canal) throw new ValidationError('Informe o canal para o contato, ex: email, cel ou fixo');
    if (!contato.valor) throw new ValidationError('Informe o valor para o canle de contato');
    if (!contato.obs) throw new ValidationError('Observação que sja pertinente');

    console.log(contato);

    return app.db('contatos').insert(contato, '*');
  };

  return { save };
};
