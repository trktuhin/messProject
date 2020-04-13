import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMealsPage } from './edit-meals.page';

const routes: Routes = [
  {
    path: '',
    component: EditMealsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMealsPageRoutingModule {}
