import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import AppConfig from './config/app.config';
@Module({
  imports: [
    CoffeesModule,
    ConfigModule.forRoot({
      load: [AppConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST, //process.env.DATABASE_HOST
        port: +process.env.DATABASE_PORT, //process.env.DATABASE_PORT
        username: process.env.DATABASE_USER, //process.env.DATABASE_USER
        password: process.env.DATABASE_PASSWORD, //process.env.DATABASE_PASSWORD
        autoLoadEntities: true, //自动加载实体
        synchronize: true, //自动同步数据库
      }),
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
