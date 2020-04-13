import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFixedExpensePage } from './add-fixed-expense.page';

const routes: Routes = [
  {
    path: '',
    component: AddFixedExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFixedExpensePageRoutingModule {}
