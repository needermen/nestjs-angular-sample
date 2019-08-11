import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { WeightLoggerModule } from './weight-logger/weight-logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TodoModule,
    WeightLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection){
  }
}
