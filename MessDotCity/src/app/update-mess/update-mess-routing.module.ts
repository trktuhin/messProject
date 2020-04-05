import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMessPage } from './update-mess.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMessPageRoutingModule {}
