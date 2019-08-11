import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './model/todo.entity';
import { Like, Repository } from 'typeorm';
import { TodoDto } from '../../../models/dtos/todo/todo.dto';
import { CreateTodoDto } from '../../../models/dtos/todo/create-todo.dto';
import { UpdateTodoDto } from '../../../models/dtos/todo/update-todo.dto';

@Injectable()
export class TodoDbService {

  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {
  }

  all(criteria: string): Promise<TodoDto[]> {
    return this.todoRepository.find({
      order: { date: 'ASC' },
      where: {
        text: Like(`%${criteria}%`),
      },
    });
  }

  get(id: number) {
    return this.todoRepository.findOne(id);
  }

  create(todo: CreateTodoDto) {
    return this.todoRepository.insert({ text: todo.text, date: new Date() });
  }

  update(id: number, todo: UpdateTodoDto) {
    this.todoRepository.findOne(id).then((td) => {
      td.text = todo.text;
      td.date = new Date();
      this.todoRepository.save(td);
    });
  }

  async remove(id: number): Promise<boolean> {
    const todo = await this.todoRepository.findOne(id);
    if (todo) {
      const result = await this.todoRepository.remove(todo);
      return result != null;
    }
    return false;
  }

}
