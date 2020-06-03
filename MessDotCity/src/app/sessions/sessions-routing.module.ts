import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionsPage } from './sessions.page';
import { AdminGuardService } from '../_guards/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SessionsPage
  },
  {
    path: 'add-session',
    loadChildren: () => import('./add-session/add-session.module').then( m => m.AddSessionPageModule),
    canLoad: [AdminGuardService]
  },
  {
    path: 'edit-session/:sessionId',
    loadChildren: () => import('./edit-session/edit-session.module').then( m => m.EditSessionPageModule),
    canLoad: [AdminGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsPageRoutingModule {}
