import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './_guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'dashboard/:messname',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'create-mess',
    loadChildren: () => import('./create-mess/create-mess.module').then( m => m.CreateMessPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'visit',
    loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule)
  },
  {
    path: 'members/:messname',
    loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule)
  },
  {
    path: 'update-mess/:messname',
    loadChildren: () => import('./update-mess/update-mess.module').then( m => m.UpdateMessPageModule)
  },
  {
    path: 'sessions/:messname',
    loadChildren: () => import('./sessions/sessions.module').then( m => m.SessionsPageModule)
  },
  {
    path: 'deposits/:messname',
    loadChildren: () => import('./deposits/deposits.module').then( m => m.DepositsPageModule)
  },
  {
    path: 'notices/:messname',
    loadChildren: () => import('./notices/notices.module').then( m => m.NoticesPageModule)
  },
  {
    path: 'daily-expenses/:messname',
    loadChildren: () => import('./daily-expenses/daily-expenses.module').then( m => m.DailyExpensesPageModule)
  },
  {
    path: 'fixed-expenses/:messname',
    loadChildren: () => import('./fixed-expenses/fixed-expenses.module').then( m => m.FixedExpensesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
