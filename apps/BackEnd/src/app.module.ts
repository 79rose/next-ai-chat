import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './user/user.module';
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
        host: 'localhost',
        port: 5432,
        username: 'postgres', //'postgres
        password: '123456aa',
        autoLoadEntities: true, //自动加载实体
        synchronize: true, //自动同步数据库
      }),
    }),
    CommonModule,
    ChatModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
