import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoRoutingModule} from './todo-routing.module';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoService} from './services/todo.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TodoCreateComponent} from './todo-list/todo-create/todo-create.component';
import {TodoItemComponent} from './todo-list/todo-item/todo-item.component';
import {TodoComponent} from './todo.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoCreateComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    TodoService
  ]
})
export class TodoModule {
}
