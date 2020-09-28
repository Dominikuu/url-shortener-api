const knex = require('knex')({
    client: 'pg',
    connection: process.env.POSTGRES_URI,
    // pool: {
    //   min: 0,
    //   max: 7
    // }
});
    
module.exports = knex;