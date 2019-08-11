import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './model/todo.entity';
import { TodoDbService } from './todo-db.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [{ provide: TodoService, useClass: TodoDbService}, TodoDbService],
  controllers: [TodoController],
})
export class TodoModule {
}
