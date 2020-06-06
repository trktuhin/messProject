import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DepositInfo } from '../_models/depositInfo';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  baseUrl = environment.apiUrl + 'deposits/';

  constructor(private http: HttpClient) { }

  getMemberDropdown() {
    return this.http.get(this.baseUrl + 'GetMemberDropdown');
  }

  getDeposits(sessionId?: number) {
    let selectedSessionId = 0;
    if (sessionId) {
      selectedSessionId = sessionId;
    }
    return this.http.get<DepositInfo[]>(this.baseUrl + 'GetDeposits' + '?sessionId=' + selectedSessionId);
  }

  addDeposit(model: any) {
    return this.http.post(this.baseUrl + 'AddDeposit', model);
  }

  getDepositHistory(memberId: number, sessionId?: number) {
    let selectedSessionId = 0;
    if (sessionId) {
      selectedSessionId = sessionId;
    }
    return this.http.get(this.baseUrl + 'GetDepositHistory/' + memberId + '?sessionId=' + selectedSessionId);
  }

}
