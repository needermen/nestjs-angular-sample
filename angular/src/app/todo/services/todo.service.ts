import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CreateTodoDto} from "../../../../../models/dtos/todo/create-todo.dto";
import {TodoDto} from "../../../../../models/dtos/todo/todo.dto";
import {Observable} from "rxjs";
import {UpdateTodoDto} from "../../../../../models/dtos/todo/update-todo.dto";

@Injectable()
export class TodoService {

  constructor(private http: HttpClient) {

  }

  getAll(criteria: string): Observable<TodoDto[]> {
    return this.http.get<TodoDto[]>(`${environment.baseUrl}/todo`,
      {params: new HttpParams().set('criteria', criteria ? criteria : '')});
  }

  get(id: number) : Observable<TodoDto> {
    return this.http.get<TodoDto>(`${environment.baseUrl}/todo/${id}`);
  }

  create(todo: CreateTodoDto) {
    return this.http.post(`${environment.baseUrl}/todo`, todo);
  }

  update(id: number, todo: UpdateTodoDto) {
    return this.http.put(`${environment.baseUrl}/todo/${id}`, todo);
  }

  remove(id: number) {
    return this.http.delete(`${environment.baseUrl}/todo/${id}`);
  }
}
