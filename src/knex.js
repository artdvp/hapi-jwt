export default require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.IP,
        user: 'isphins',
        password: '',
        database: 'c9',
        charset: 'utf8'
    }
})