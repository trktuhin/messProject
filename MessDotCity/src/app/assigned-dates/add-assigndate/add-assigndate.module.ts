import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAssigndatePageRoutingModule } from './add-assigndate-routing.module';

import { AddAssigndatePage } from './add-assigndate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAssigndatePageRoutingModule
  ],
  declarations: [AddAssigndatePage]
})
export class AddAssigndatePageModule {}
