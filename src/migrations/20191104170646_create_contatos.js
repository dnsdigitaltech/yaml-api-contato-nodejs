
exports.up = (knex) => {
    return knex.schema.createTable('contatos', (t) => {
      t.increments('id').primary();
      t.string('nome').notNull();
      t.string('canal').notNull();
      t.string('valor').notNull();
      t.string('obs').notNull();
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('contatos');
  };
  