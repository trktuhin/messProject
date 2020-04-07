import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDailyExpensePage } from './add-daily-expense.page';

const routes: Routes = [
  {
    path: '',
    component: AddDailyExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDailyExpensePageRoutingModule {}
