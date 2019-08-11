import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer, ViewChild} from '@angular/core';
import {TodoDto} from '../../../../../../models/dtos/todo/todo.dto';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {TodoService} from '../../services/todo.service';
import {TodoListService} from '../todo-list.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TodoDto;
  @Output() deleted: EventEmitter<void> = new EventEmitter();

  faTrashAlt = faTrashAlt;

  editMode: boolean;

  @ViewChild('editInput', { static: false }) inputElement: ElementRef;

  constructor(private todoService: TodoService, private todoListService: TodoListService, private renderer: Renderer) {
  }

  ngOnInit() {
    this.todoListService.editModeEnabled.subscribe((id) => {
      if (id != this.todo.id && this.editMode) {
        this.update();
      }
    });
  }

  onTextClick() {
    this.enableEditMode();
    setTimeout(() => {
      this.renderer.invokeElementMethod(this.inputElement.nativeElement, 'focus');
    }, 0);
  }

  onDeleteClick() {
    this.delete(this.todo.id);
  }

  onEditKeyUp(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.update();
    } else if (event.key == 'Escape') {
      this.disableEditMode();
    }
  }

  onBlur() {
    this.update();
  }

  private enableEditMode() {
    this.editMode = true;
    this.todoListService.enableEditMode(this.todo.id);
  }

  private disableEditMode() {
    this.editMode = false;
  }

  private fetch() {
    this.todoService.get(this.todo.id).subscribe(todo => this.todo = todo);
  }

  private update() {
    this.todoService.update(this.todo.id, this.todo)
      .subscribe(() => {
        this.disableEditMode();
        this.fetch();
      });
  }

  private delete(id: number) {
    this.todoService.remove(id).subscribe((result) => {
      if (result) {
        this.deleted.emit();
      }
    });
  }
}
