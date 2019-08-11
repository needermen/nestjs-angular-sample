import { Injectable } from '@nestjs/common';
import { TodoDto } from '../../../models/dtos/todo/todo.dto';
import { CreateTodoDto } from '../../../models/dtos/todo/create-todo.dto';
import { UpdateTodoDto } from '../../../models/dtos/todo/update-todo.dto';
import { Todo } from './model/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>) {

  }

  private todos: Todo[] = [
    { id: 0, text: 'hide broom if search is empty' },
    { id: 1, text: 'make directive for autoselectable input when it appears' },
    { id: 2, text: 'make todo items draggable ordering' },
    { id: 4, text: 'add mongo database' },
  ];

  all(criteria: string): TodoDto[] {
    let result: TodoDto[];
    if (criteria && criteria.trim()) {
      result = this.todos
        .filter((todo) => todo.text.trim().toLowerCase().indexOf(criteria.trim().toLowerCase()) > -1);
    } else {
      result = this.todos;
    }

    return result;

    // return result.sort((todo1, todo2) => todo1.text < todo2.text ? 0 : 1);
  }

  get(id: number): TodoDto {
    const filtered = this.todos.filter(todo => todo.id == id);
    if (filtered && filtered.length > 0) {
      return filtered[0];
    } else {
      return null;
    }
  }

  create(todo: CreateTodoDto) {
    this.todos.push({ text: todo.text, id: this.todos.length });
    return true;
  }

  update(id: number, todo: UpdateTodoDto) {
    const todoToUpdate = this.get(id);
    if (todoToUpdate) {
      todoToUpdate.text = todo.text;
      return true;
    }
    return false;
  }

  remove(id: number) {
    const nodeToRemove = this.get(id);
    if (nodeToRemove) {
      this.todos.splice(this.todos.indexOf(nodeToRemove), 1);
      return true;
    }
    return false;
  }
}
