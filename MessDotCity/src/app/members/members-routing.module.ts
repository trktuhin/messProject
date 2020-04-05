import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersPage } from './members.page';

const routes: Routes = [
  {
    path: '',
    component: MembersPage
  },
  {
    path: 'add-member',
    loadChildren: () => import('./add-member/add-member.module').then( m => m.AddMemberPageModule)
  },
  {
    path: ':memberId/view-meals',
    loadChildren: () => import('./view-meals/view-meals.module').then( m => m.ViewMealsPageModule)
  },
  {
    path: ':memberId',
    loadChildren: () => import('./member-details/member-details.module').then( m => m.MemberDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersPageRoutingModule {}
