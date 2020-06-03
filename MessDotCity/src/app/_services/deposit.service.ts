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

  getDeposits() {
    return this.http.get<DepositInfo[]>(this.baseUrl + 'GetDeposits');
  }

  addDeposit(model: any) {
    return this.http.post(this.baseUrl + 'AddDeposit', model);
  }

  getDepositHistory(memberId: number) {
    return this.http.get(this.baseUrl + 'GetDepositHistory/' + memberId);
  }

}
