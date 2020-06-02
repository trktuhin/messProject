import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixedExpensesPage } from './fixed-expenses.page';
import { AdminGuardService } from '../_guards/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: FixedExpensesPage
  },
  {
    path: 'add-fixed-expense',
    loadChildren: () => import('./add-fixed-expense/add-fixed-expense.module').then( m => m.AddFixedExpensePageModule),
    canLoad: [AdminGuardService]
  },
  {
    path: 'edit-expense/:id',
    loadChildren: () => import('./edit-expense/edit-expense.module').then( m => m.EditExpensePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixedExpensesPageRoutingModule {}
