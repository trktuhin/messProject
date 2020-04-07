import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyExpensesPage } from './daily-expenses.page';

const routes: Routes = [
  {
    path: '',
    component: DailyExpensesPage
  },
  {
    path: 'add-daily-expense',
    loadChildren: () => import('./add-daily-expense/add-daily-expense.module').then( m => m.AddDailyExpensePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyExpensesPageRoutingModule {}
