import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { KeypressModule } from './keypress/keypress.module';
import { Keypress } from './keypress/entities/keypress.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'app_user',
      password: process.env.DB_PASSWORD || 'your_password',
      database: process.env.DB_NAME || 'keypress_analytics',
      entities: [Keypress],
      synchronize: true,
    }),
    KeypressModule,
  ],
})
export class AppModule { }