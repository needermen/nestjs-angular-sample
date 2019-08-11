import {Injectable} from '@angular/core';
import {WeightLogDto} from '../models/weight-log.dto';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class WeightLogService {

  constructor(private http: HttpClient) {
  }

  put(weightLog: WeightLogDto) {
    return this.http.put(`${environment.baseUrl}/weightlog`, weightLog);
  }

  getAll(): Observable<WeightLogDto[]> {
    return this.http.get<WeightLogDto[]>(`${environment.baseUrl}/weightlog`);
  }

  getByDate(date: Date) {
    return this.http.get<WeightLogDto>(`${environment.baseUrl}/weightlog/${date}`);
  }
}
