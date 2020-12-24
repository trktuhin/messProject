import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignedDatesPage } from './assigned-dates.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedDatesPage
  },
  {
    path: 'add-assigndate',
    loadChildren: () => import('./add-assigndate/add-assigndate.module').then( m => m.AddAssigndatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedDatesPageRoutingModule {}
