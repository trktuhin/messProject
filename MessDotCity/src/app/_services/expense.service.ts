import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DailyExpense } from '../_models/dailyExpense';
import { FixedExpense } from '../_models/fixedExpense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  baseUrl = environment.apiUrl + 'expense/';

  constructor(private http: HttpClient) { }

  addDailyExpense(model: any) {
    return this.http.post(this.baseUrl + 'AddDailyExpense', model);
  }

  getDailyExpenses() {
    return this.http.get<DailyExpense[]>(this.baseUrl + 'GetDailyExpenses');
  }

  getSingleExpense(id: number) {
    return this.http.get(this.baseUrl + 'GetDailyExpenseDetails/' + id);
  }

  editDailyExpense(model: any) {
    return this.http.post(this.baseUrl + 'EditDailyExpense', model);
  }

  deleteDailyExpense(id: number) {
    return this.http.delete(this.baseUrl + 'DeleteDailyExpense/' + id);
  }

  addFixedExpense(model: any) {
    return this.http.post(this.baseUrl + 'AddFixedExpense', model);
  }

  updateFixedExpense(model: any) {
    return this.http.put(this.baseUrl + 'UpdateFixedExpense', model);
  }

  getFixedExpenses() {
    return this.http.get<FixedExpense[]>(this.baseUrl + 'GetFixedExpenses');
  }

  getFixedExpense(id: number) {
    return this.http.get<FixedExpense>(this.baseUrl + 'GetFixedExpense/' + id);
  }

  deleteFixedExpense(id: number) {
    return this.http.delete(this.baseUrl + 'DeleteFixedExpense/' + id);
  }

  getOtherMealRate() {
    return this.http.get(this.baseUrl + 'GetMealRatesWithPerHeads');
  }

}
