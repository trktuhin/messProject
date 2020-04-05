import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMessPageRoutingModule } from './update-mess-routing.module';

import { UpdateMessPage } from './update-mess.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateMessPageRoutingModule
  ],
  declarations: [UpdateMessPage]
})
export class UpdateMessPageModule {}
