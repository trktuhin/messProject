import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositHistoryPage } from './deposit-history.page';

const routes: Routes = [
  {
    path: '',
    component: DepositHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositHistoryPageRoutingModule {}
