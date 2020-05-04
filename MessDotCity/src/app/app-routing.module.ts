import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './_guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'dashboard',
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
    path: 'members',
    loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'update-mess',
    loadChildren: () => import('./update-mess/update-mess.module').then( m => m.UpdateMessPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'sessions',
    loadChildren: () => import('./sessions/sessions.module').then( m => m.SessionsPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'deposits',
    loadChildren: () => import('./deposits/deposits.module').then( m => m.DepositsPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'notices',
    loadChildren: () => import('./notices/notices.module').then( m => m.NoticesPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'daily-expenses',
    loadChildren: () => import('./daily-expenses/daily-expenses.module').then( m => m.DailyExpensesPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'fixed-expenses',
    loadChildren: () => import('./fixed-expenses/fixed-expenses.module').then( m => m.FixedExpensesPageModule),
    canLoad: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
