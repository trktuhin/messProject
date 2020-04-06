import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositHistoryPageRoutingModule } from './deposit-history-routing.module';

import { DepositHistoryPage } from './deposit-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositHistoryPageRoutingModule
  ],
  declarations: [DepositHistoryPage]
})
export class DepositHistoryPageModule {}
