import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({})
export class DatabaseModule {
    Sequelize@Module.forRoot({

        dialect = 'mysql';
        host = '127.0.0.1';
        port = 3306;
        username = 'root';
        password = '56connections78';
        database = 'myDatabase';
        providers = [...databaseProviders];
        exports = [...databaseProviders];
    })
}
