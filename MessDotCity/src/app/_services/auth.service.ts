import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  decodedToken: any;
  currentUser: any;
  messName: string;
  photoUrl = new BehaviorSubject<string>(environment.baseImageUrl + '/user.jpg');
  currentPhotoUrl = this.photoUrl.asObservable();
  jwtHelper = new JwtHelperService();
  get IsLoggedIn() {
    let result = false;
    const token = localStorage.getItem('token');
    try {
      result = !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      result = false;
    }
    return result;
  }

  constructor(private http: HttpClient) { }
  changeProfilePhoto(photoName: string) {
    this.photoUrl.next(environment.baseImageUrl + photoName);
  }
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          localStorage.setItem('messName', user.messName);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          if (user.user) {
            this.currentUser = user.user;
            this.changeProfilePhoto(this.currentUser.photoUrl);
            this.messName = user.messName;
          }
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('messName');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model).pipe(
      map(res => {
        // console.log(res);
      })
    );
  }
}
