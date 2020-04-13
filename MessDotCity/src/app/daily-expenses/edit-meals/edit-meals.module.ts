import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMealsPageRoutingModule } from './edit-meals-routing.module';

import { EditMealsPage } from './edit-meals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMealsPageRoutingModule
  ],
  declarations: [EditMealsPage]
})
export class EditMealsPageModule {}
