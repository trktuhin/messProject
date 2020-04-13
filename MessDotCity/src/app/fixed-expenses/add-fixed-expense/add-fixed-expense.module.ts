import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFixedExpensePageRoutingModule } from './add-fixed-expense-routing.module';

import { AddFixedExpensePage } from './add-fixed-expense.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddFixedExpensePageRoutingModule
  ],
  declarations: [AddFixedExpensePage]
})
export class AddFixedExpensePageModule {}
