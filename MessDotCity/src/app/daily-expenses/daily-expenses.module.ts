import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyExpensesPageRoutingModule } from './daily-expenses-routing.module';

import { DailyExpensesPage } from './daily-expenses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyExpensesPageRoutingModule
  ],
  declarations: [DailyExpensesPage]
})
export class DailyExpensesPageModule {}
