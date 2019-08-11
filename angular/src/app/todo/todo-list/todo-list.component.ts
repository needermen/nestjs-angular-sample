import {Component, OnInit} from '@angular/core';
import {TodoDto} from '../../../../../models/dtos/todo/todo.dto';
import {TodoService} from '../services/todo.service';
import {FormBuilder, FormControl, NgModel} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {TodoListService} from './todo-list.service';
import {faBroom} from '@fortawesome/free-solid-svg-icons';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoListService]
})
export class TodoListComponent implements OnInit {
  searchControl: FormControl;

  faBroom = faBroom;

  todos: TodoDto[] = [];

  constructor(private todoService: TodoService,
              private fb: FormBuilder,
              private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('Todo');
    this.fetch('');
    this.searchControl = this.fb.control('');
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.fetch(value);
      });
  }

  onClearSearchClick() {
    this.searchControl.reset();
  }

  onItemRemoved() {
    this.fetch('');
  }

  onItemAdded() {
    this.fetch('');
  }

  private fetch(value) {
    this.todoService.getAll(value)
      .subscribe(result => this.todos = result);
  }
}
