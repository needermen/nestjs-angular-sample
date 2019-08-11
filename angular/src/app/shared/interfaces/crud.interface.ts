import {Observable} from 'rxjs';

export interface CrudInterface<T> {

  getAll(criteria: string): Observable<T[]>;

  get(id: number): Observable<T>

  create(todo: T);

  update(id: number, todo: T)

  remove(id: number);
}
