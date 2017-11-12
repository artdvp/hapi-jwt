module.exports = {
    development: {
        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },
        client: 'mysql',
        connection: {
            host: process.env.IP,
            user: 'isphins',
            password: '',
            database: 'c9',
            charset: 'utf8'
        }
    }
}