import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessService {
  baseUrl = environment.apiUrl + 'Mess/';

  constructor(private http: HttpClient) { }

  createMess(model: any) {
    return this.http.post(this.baseUrl + 'createMess', model);
  }

}
