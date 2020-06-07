import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyExpensesPage } from './daily-expenses.page';
import { ManagerGuardService } from '../_guards/manager-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DailyExpensesPage
  },
  {
    path: 'add-daily-expense',
    loadChildren: () => import('./add-daily-expense/add-daily-expense.module').then( m => m.AddDailyExpensePageModule),
    canLoad: [ManagerGuardService]
  },
  {
    path: 'edit-meals/:id',
    loadChildren: () => import('./edit-meals/edit-meals.module').then( m => m.EditMealsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyExpensesPageRoutingModule {}
