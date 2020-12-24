import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedDatesPageRoutingModule } from './assigned-dates-routing.module';

import { AssignedDatesPage } from './assigned-dates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedDatesPageRoutingModule
  ],
  declarations: [AssignedDatesPage]
})
export class AssignedDatesPageModule {}
