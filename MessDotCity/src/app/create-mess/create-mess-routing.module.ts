import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMessPage } from './create-mess.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMessPageRoutingModule {}
