import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionsPage } from './sessions.page';

const routes: Routes = [
  {
    path: '',
    component: SessionsPage
  },
  {
    path: 'add-session',
    loadChildren: () => import('./add-session/add-session.module').then( m => m.AddSessionPageModule)
  },
  {
    path: 'edit-session/:sessionId',
    loadChildren: () => import('./edit-session/edit-session.module').then( m => m.EditSessionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionsPageRoutingModule {}
