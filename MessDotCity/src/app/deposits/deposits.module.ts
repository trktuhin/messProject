import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositsPageRoutingModule } from './deposits-routing.module';

import { DepositsPage } from './deposits.page';
import { AddWithdrawComponent } from './add-withdraw/add-withdraw.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DepositsPage, AddWithdrawComponent],
  entryComponents: [AddWithdrawComponent]
})
export class DepositsPageModule {}
