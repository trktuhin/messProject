import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMealsPageRoutingModule } from './view-meals-routing.module';

import { ViewMealsPage } from './view-meals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMealsPageRoutingModule
  ],
  declarations: [ViewMealsPage]
})
export class ViewMealsPageModule {}
