module.exports = ({
    knex = require('./connection'),
    name = '',
    tableName = '',
    selectableProps = '*',
    timeout = 1000
   }) => {
       const query = knex.from(tableName)
   
       const create = props => {
         delete props.id
         return knex.insert(props)
           .returning(selectableProps)
           .into(tableName)
           .timeout(timeout)
       }
       const findAll = () => {
         return knex.select(selectableProps)
           .from(tableName)
           .timeout(timeout)
       }
       const find = filters => {
         return knex.select(selectableProps)
           .from(tableName)
           .where(...filters)
           .timeout(timeout)
       }
   
       const update = (id, props) => {
         delete props.id
   
         return knex.update(props)
           .from(tableName)
           .where({
             id
           })
           .returning(selectableProps)
           .timeout(timeout)
       }
   
       const destroy = id => {
         return knex.del()
           .from(tableName)
           .where({
             id
           })
           .timeout(timeout)
       }

       const createTransaction = (operation) => {
        return Promise.resolve(knex.transaction(operation));
      }
   
       return {
         query,
         name,
         tableName,
         selectableProps,
         timeout,
         create,
         findAll,
         find,
         update,
         destroy,
         createTransaction,
       }
     }