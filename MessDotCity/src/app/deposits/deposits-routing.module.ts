import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositsPage } from './deposits.page';

const routes: Routes = [
  {
    path: '',
    component: DepositsPage
  },
  {
    path: 'deposit-history/:memberId',
    loadChildren: () => import('./deposit-history/deposit-history.module').then( m => m.DepositHistoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositsPageRoutingModule {}
