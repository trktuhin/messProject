import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDailyExpensePageRoutingModule } from './add-daily-expense-routing.module';

import { AddDailyExpensePage } from './add-daily-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDailyExpensePageRoutingModule
  ],
  declarations: [AddDailyExpensePage]
})
export class AddDailyExpensePageModule {}
