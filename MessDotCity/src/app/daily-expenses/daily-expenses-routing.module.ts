import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyExpensesPage } from './daily-expenses.page';
import { AdminGuardService } from '../_guards/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DailyExpensesPage
  },
  {
    path: 'add-daily-expense',
    loadChildren: () => import('./add-daily-expense/add-daily-expense.module').then( m => m.AddDailyExpensePageModule),
    canLoad: [AdminGuardService]
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
