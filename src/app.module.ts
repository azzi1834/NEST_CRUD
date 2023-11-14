import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { databaseProviders } from './database.providers';


@Module({
  imports: [ Sequelize@Module.forRoot({

    dialect : 'mysql',
    host : '127.0.0.1',
    port : 3306,
    username : 'root',
    password : '56connections78',
    database : 'myDatabase',
    providers : [...databaseProviders],
    exports : [...databaseProviders],
}), UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
