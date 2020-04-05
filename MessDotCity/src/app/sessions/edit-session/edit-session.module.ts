import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSessionPageRoutingModule } from './edit-session-routing.module';

import { EditSessionPage } from './edit-session.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditSessionPageRoutingModule
  ],
  declarations: [EditSessionPage]
})
export class EditSessionPageModule {}
