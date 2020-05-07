import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Route, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

constructor(private authService: AuthService, private router: Router) { }

canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
  if (!this.authService.IsLoggedIn) {
    this.router.navigateByUrl('/auth');
  }
  return this.authService.IsLoggedIn;
}

}
