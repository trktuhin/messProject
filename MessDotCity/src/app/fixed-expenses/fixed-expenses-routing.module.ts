import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixedExpensesPage } from './fixed-expenses.page';
import { ManagerGuardService } from '../_guards/manager-guard.service';

const routes: Routes = [
  {
    path: '',
    component: FixedExpensesPage
  },
  {
    path: 'add-fixed-expense',
    loadChildren: () => import('./add-fixed-expense/add-fixed-expense.module').then( m => m.AddFixedExpensePageModule),
    canLoad: [ManagerGuardService]
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
