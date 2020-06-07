import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isManager()) {
      this.router.navigateByUrl('/dashboard');
    }
    return this.authService.isManager();
  }

}
