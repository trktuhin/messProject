import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateMessPageRoutingModule } from './create-mess-routing.module';

import { CreateMessPage } from './create-mess.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CreateMessPageRoutingModule
  ],
  declarations: [CreateMessPage]
})
export class CreateMessPageModule {}
