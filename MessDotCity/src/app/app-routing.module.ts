import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './_guards/auth-guard.service';
import { MessGuardService } from './_guards/mess-guard.service';

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
    canLoad: [AuthGuardService, MessGuardService]
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
    path: 'members',
    loadChildren: () => import('./members/members.module').then( m => m.MembersPageModule),
    canLoad: [AuthGuardService, MessGuardService]
  },
  {
    path: 'update-mess',
    loadChildren: () => import('./update-mess/update-mess.module').then( m => m.UpdateMessPageModule),
    canLoad: [AuthGuardService, MessGuardService]
  },
  {
    path: 'sessions',
    loadChildren: () => import('./sessions/sessions.module').then( m => m.SessionsPageModule),
    canLoad: [AuthGuardService, MessGuardService]
  },
  {
    path: 'deposits',
    loadChildren: () => import('./deposits/deposits.module').then( m => m.DepositsPageModule),
    canLoad: [AuthGuardService, MessGuardService]
  },
  {
    path: 'daily-expenses',
    loadChildren: () => import('./daily-expenses/daily-expenses.module').then( m => m.DailyExpensesPageModule),
    canLoad: [AuthGuardService, MessGuardService]
  },
  {
    path: 'fixed-expenses',
    loadChildren: () => import('./fixed-expenses/fixed-expenses.module').then( m => m.FixedExpensesPageModule),
    canLoad: [AuthGuardService, MessGuardService]
  },
  {
    path: 'assigned-dates',
    loadChildren: () => import('./assigned-dates/assigned-dates.module').then( m => m.AssignedDatesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
