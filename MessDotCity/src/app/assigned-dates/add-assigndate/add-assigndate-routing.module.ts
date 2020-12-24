import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAssigndatePage } from './add-assigndate.page';

const routes: Routes = [
  {
    path: '',
    component: AddAssigndatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAssigndatePageRoutingModule {}
