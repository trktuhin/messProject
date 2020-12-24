import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AssignedDate } from '../_models/assignedDate';

@Injectable({
  providedIn: 'root'
})
export class AssignedDateService {
  baseUrl = environment.apiUrl + 'AssignedDate/';
  constructor(private http: HttpClient) { }

  getAssignedDates(sessionId?: number) {
    let selectedSessionId = 0;
    if (sessionId) {
      selectedSessionId = sessionId;
    }
    return this.http.get<AssignedDate[]>(this.baseUrl + 'GetAllAssignedDates' + '?sessionId=' + selectedSessionId);
  }
}
