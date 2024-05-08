const pg = require('pg');

const database = new pg.Client('postgres://tjmdgoio:OSkVHDSDkIJmRmbwPnHgljXCHjR44Lfk@kesavan.db.elephantsql.com/tjmdgoio');

database.connect((erro) => {
    if (erro) return console.log('Erro na conexão com o DB', erro);
    return console.log('Conectado ao DB!');
});

module.exports = database;
