import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class TodoListService {
  private editModeEnabledObserver: Subject<number> = new Subject<number>();
  editModeEnabled = this.editModeEnabledObserver.asObservable();

  constructor() {
  }

  enableEditMode(id: number) {
    this.editModeEnabledObserver.next(id);
  }
}
