import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the configuration available globally
      envFilePath: '.env', // specifies the path to the .env file
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
