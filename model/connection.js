const knex = require('knex')({
    client: 'pg',
    connection: process.env.POSTGRES_URI,
});
    
module.exports = knex;