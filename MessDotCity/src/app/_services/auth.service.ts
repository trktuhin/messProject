import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
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
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          const decodedToken = this.jwtHelper.decodeToken(user.token);
          localStorage.setItem('messName', decodedToken.Messname);
          localStorage.setItem('username', decodedToken.unique_name);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('messName');
    localStorage.removeItem('username');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model).pipe(
      map(res => {
        // console.log(res);
      })
    );
  }
}
