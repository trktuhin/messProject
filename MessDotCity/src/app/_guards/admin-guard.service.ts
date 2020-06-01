import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { AuthService } from '../_services/auth.service';
import { Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.authService.isAdmin()) {
      this.router.navigateByUrl('/dashboard');
    }
    return this.authService.isAdmin();
  }

}
