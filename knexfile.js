module.exports = {
    test: {
        client: 'pg',
        version: '^7.12.1',
        connection: {
            host: 'host',
            user: 'user',
            password: 'pswd',
            database: 'nodejs' 
        },
        migrations: { directory: 'src/migrations' },
        seeds: { directory: 'src/seeds' },
    },
    prod: {
        client: 'pg',
        version: '^7.12.1',
        connection: {
            host: 'host',
            user: 'user',
            password: 'pswd',
            database: 'prodnodejs' 
        },
        migrations: { directory: 'src/migrations' },
    },
}