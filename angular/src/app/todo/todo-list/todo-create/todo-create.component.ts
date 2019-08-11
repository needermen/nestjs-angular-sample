import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {TodoService} from '../../services/todo.service';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent implements OnInit, AfterViewInit {
  addControl: FormControl;
  @ViewChild('add', { static: true }) addInput: ElementRef;

  @Output() created: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private todoService: TodoService) {
  }

  ngOnInit() {
    this.addControl = this.fb.control('');
  }


  ngAfterViewInit(): void {
    fromEvent(this.addInput.nativeElement, 'keyup')
      .subscribe((event: KeyboardEvent) => {
        if (event.key == 'Enter') {
          this.create();
        } else if (event.key == 'Escape') {
          this.addControl.reset();
        }
      });
    fromEvent(this.addInput.nativeElement, 'blur')
      .subscribe((event) => {
        this.addControl.reset();
      });
  }

  private create() {
    this.todoService.create({text: this.addControl.value})
      .subscribe(result => {
        this.addControl.reset();
        this.created.emit();
      });
  }
}
