module.exports = {
    test: {
        client: 'pg',
        version: '^7.12.1',
        connection: {
            host: '192.168.223.53',
            user: 'mcavalini',
            password: 'cavalini1998',
            database: 'nodejs' 
        },
        migrations: { directory: 'src/migrations' },
        seeds: { directory: 'src/seeds' },
    },
    prod: {
        client: 'pg',
        version: '^7.12.1',
        connection: {
            host: '192.168.223.53',
            user: 'mcavalini',
            password: 'cavalini1998',
            database: 'prodnodejs' 
        },
        migrations: { directory: 'src/migrations' },
    },
}